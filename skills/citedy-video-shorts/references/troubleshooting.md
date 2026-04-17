# Troubleshooting

## Common Issues

### Auth missing

- run registration flow
- get human approval
- save the returned key

### Credits missing

- stop early
- explain required credits
- do not partially run expensive steps

### Generation still processing

- poll every 10 seconds with a maximum of 24 attempts
- stop polling immediately on terminal statuses such as `failed`, `expired`, or `not found`
- stop polling when the total wait budget is exhausted and return a clear timeout message
- keep polling silent until the wait meaningfully exceeds normal expectations, then tell the user the run is delayed but still in progress

### Publish partial success

- report which platform succeeded
- report which platform failed
- keep the successful result

### Repetitive output quality

- consult `ugc-video-log.jsonl`
- vary hook angle or avatar recipe
- do not repeat the exact same combo unnecessarily
