package com.example.livepoll.service;

import com.example.livepoll.dto.PollCreateRequest;
import com.example.livepoll.dto.PollOptionResponse;
import com.example.livepoll.dto.PollResponse;
import com.example.livepoll.dto.VoteRequest;
import com.example.livepoll.entity.Poll;
import com.example.livepoll.entity.PollOption;
import com.example.livepoll.entity.User;
import com.example.livepoll.entity.Vote;
import com.example.livepoll.exception.BadRequestException;
import com.example.livepoll.exception.ResourceNotFoundException;
import com.example.livepoll.repository.PollOptionRepository;
import com.example.livepoll.repository.PollRepository;
import com.example.livepoll.repository.UserRepository;
import com.example.livepoll.repository.VoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
public class PollService {

    private final PollRepository pollRepository;
    private final PollOptionRepository pollOptionRepository;
    private final VoteRepository voteRepository;
    private final UserRepository userRepository;

    public PollService(PollRepository pollRepository,
                       PollOptionRepository pollOptionRepository,
                       VoteRepository voteRepository,
                       UserRepository userRepository) {
        this.pollRepository = pollRepository;
        this.pollOptionRepository = pollOptionRepository;
        this.voteRepository = voteRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public PollResponse createPoll(PollCreateRequest request, String creatorEmail) {
        User creator = userRepository.findByEmail(creatorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Creator not found"));

        Poll poll = new Poll();
        poll.setQuestion(request.getQuestion());
        poll.setCreatedBy(creator);

        List<PollOption> options = request.getOptions().stream()
                .map(text -> {
                    PollOption option = new PollOption();
                    option.setOptionText(text);
                    option.setPoll(poll);
                    return option;
                })
                .toList();

        poll.setOptions(options);
        return mapToResponse(pollRepository.save(poll));
    }

    public List<PollResponse> getAllPolls() {
        return pollRepository.findAll().stream()
                .sorted(Comparator.comparing(Poll::getCreatedAt).reversed())
                .map(this::mapToResponse)
                .toList();
    }

    public PollResponse getPoll(Long id) {
        Poll poll = pollRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Poll not found"));
        return mapToResponse(poll);
    }

    @Transactional
    public PollResponse vote(Long pollId, VoteRequest request, String userEmail) {
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new ResourceNotFoundException("Poll not found"));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!poll.isActive()) {
            throw new BadRequestException("Poll is closed");
        }

        if (voteRepository.existsByPollAndUser(poll, user)) {
            throw new BadRequestException("You have already voted on this poll");
        }

        PollOption option = pollOptionRepository.findById(request.getOptionId())
                .orElseThrow(() -> new ResourceNotFoundException("Option not found"));

        if (!option.getPoll().getId().equals(pollId)) {
            throw new BadRequestException("Selected option does not belong to this poll");
        }

        option.setVoteCount(option.getVoteCount() + 1);
        pollOptionRepository.save(option);

        Vote vote = new Vote();
        vote.setPoll(poll);
        vote.setOption(option);
        vote.setUser(user);
        voteRepository.save(vote);

        return mapToResponse(pollRepository.findById(pollId).orElseThrow());
    }

    @Transactional
    public PollResponse togglePoll(Long pollId) {
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new ResourceNotFoundException("Poll not found"));
        poll.setActive(!poll.isActive());
        return mapToResponse(pollRepository.save(poll));
    }

    public PollResponse mapToResponse(Poll poll) {
        PollResponse response = new PollResponse();
        response.setId(poll.getId());
        response.setQuestion(poll.getQuestion());
        response.setActive(poll.isActive());
        response.setCreatedAt(poll.getCreatedAt());
        response.setCreatedBy(poll.getCreatedBy() != null ? poll.getCreatedBy().getName() : "System");
        response.setOptions(poll.getOptions().stream()
                .map(option -> new PollOptionResponse(option.getId(), option.getOptionText(), option.getVoteCount()))
                .toList());
        return response;
    }
}
