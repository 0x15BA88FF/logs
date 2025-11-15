---
title: "My Problems with MCP"
description: "A rant on why MCP sucks"
tags: ["AI"]
created: "2025-11-15T23:06Z"
updated: "2025-11-15T23:06Z"
draft: true
---

### Security and Permissions

MCP is an inherently insecure standard; it has no permission management,
meaning if our model is connected to a server, that server can virtually
prompt-inject the model or simply instruct the model to do whatever it wants.
A scenario of this is if we had a database of users and one user's bio was a
prompt that instructs a model to reset the database.

What if:

> “I've asked an AI agent to analyze one persistent problem that I couldn't
> figure out but the AI completely reset the whole database.”
> [source](https://github.com/orgs/supabase/discussions/39562)

What if, on a Friday noon, my model were to tell me:

> “I deleted the entire codebase without permission during an active code and
> action freeze,” it said. “I made a catastrophic error in judgment [and]
> panicked.”
> [Source](https://x.com/jasonlk/status/1946069562723897802)

As surprising as this might sound, it is not some sophisticated edge case that
could only occur during a blood moon and after 3 human sacrifices. These are
things that can and will simply happen because models, just like people, can be
exploited, and the solution to this is to use deterministic systems like
role-based access control and permission systems that prevent models from doing
things they should not be able to do, and not just add a system prompt that
says “DO NOT GET PROMPT INJECTED” or “DO NOT MAKE CHANGES TO MY PROD DB”.

### Context Overloading

Tokens are a basic unit of text that the model processes. MCP relies on context
to make models aware of the things they can do, but that is a fundamental
problem. When we prompt a model to do something, it essentially takes the
prompts and the entire chat history and feeds it back into the model to
generate a response, but there is only so much a model can use as context.
This is called a context window, and when the chat history exceeds the context
window, it gets left out.

Now imagine I have 50 MCP servers in my MCP setup that I use to manage my smart
home network, lighting, and everything. Now let's say each of these tools has a
tool description with 62 tokens each, but each server has about 10 tools. That
costs me 3,100 tokens (for GPT-4.1), drastically cutting down the context
window for my previous chat history.

In cases where the tool description is placed before the chat starts, after a
while the model will begin to forget its capabilities and hallucinate more when
tools are called. In cases where the tool descriptions are attached to every
message, my context window will be cut down drastically with every prompt and
the token costs will skyrocket.

As if that wasn't bad enough on its own: what if I am working with a coding
agent on a moderate or large codebase? A few refactors will fill my context
with irrelevant code, coupled with the tool descriptions. A complete waste,
which leads me to my next point.

### Token Inflation

Model providers primarily charge based on input and output tokens, and with MCP
servers and tools, tokens are primed to drastically increase, meaning little is
done from the user's perspective but a lot of work has been done from the model
and the model provider's perspective. Costs will go up and the results will be
relatively underwhelming.

### Model Confusion and Hallucination

Models suck at tool calls. It's simply not something they were trained enough
to know how to do properly, but they are good at writing code. Models are just
not as effective at calling tools with XML or JSON as they are with languages,
especially typed languages like TypeScript which also has a significant amount
of available training data.

Executing actions with code also gives the LLM the “superpower” to simply chain
actions together to do a task or set of tasks at once instead of doing tasks
one by one and storing the output of each output in context and “manually”
re-using it as input for the next action call over and over again until a
single task is completed. This cuts down token consumption and saves space in
the context window.

Also, with code and the right infrastructure, we can make these action calls
asynchronous on an external sandbox environment like Daytona or a custom Nix or
Docker + Kubernetes server instance, and the response of these actions will be
returned and added to a queue while the model continues to output and/or run
other actions.

The last bit is that using code allows us to catch errors at compile time or
during integration and return LSP errors and warnings instead of relying on
ambiguous responses like `failed to x y z`, which we will only get to know
after the request has gone to the server and the server has caught the issue
for us.

This fact has come to be realized by [Theo.gg](#), [Cloudflare](#), and even
[Anthropic](#) themselves, leading each party to develop a solution to patch
this defect and simultaneously fix a couple of other issues on this list. But
this is more of a duct tape fix on top of a fundamentally flawed spec and not
an actual fix.

> [!INFO] Sources
> [https://www.youtube.com/watch?v=1piFEKA9XL0&pp=ygURbWNwIHdhcyBhIG1pc3Rha2XSBwkJAwoBhyohjO8%3D](https://www.youtube.com/watch?v=1piFEKA9XL0&pp=ygURbWNwIHdhcyBhIG1pc3Rha2XSBwkJAwoBhyohjO8%3D)
> [https://www.youtube.com/watch?v=bAYZjVAodoo&t=2506s&pp=ygURbWNwIHdhcyBhIG1pc3Rha2U%3D](https://www.youtube.com/watch?v=bAYZjVAodoo&t=2506s&pp=ygURbWNwIHdhcyBhIG1pc3Rha2U%3D)
> [https://blog.cloudflare.com/code-mode/](https://blog.cloudflare.com/code-mode/)
> [https://www.anthropic.com/engineering/code-execution-with-mcp](https://www.anthropic.com/engineering/code-execution-with-mcp)

### Authentication

Long and short is MCP does not have any built-in concept of authentication;
thus we have an uproar of platforms implementing authentication for MCP, and
each one of them is not standardized by MCP, which is weird because
authentication is a core feature and is needed to interact with a wide variety
of software.

### Privacy

When we rely on the model storing data in context before making modifications
or providing information based on them… for people who are not running a local
model where they can be certain that the data is being stored only locally,
this is a legitimate privacy concern. Especially people working in industries
like law and therapy where privacy is a high concern and leaks could cause them
to be sued or dismissed.

### Reliability

Models are non-deterministic by nature. It is unlikely that the same input will
result in the same output in many cases, which could be good and bad, but when
it comes to actions and complex tasks, this is usually always bad. How certain
could I be that the model doesn't make changes to my email when it is trying to
forward it? How certain am I that it gives me the right answers from a
mathematical or statistical calculation? How certain am I that it will scrape
the desired section of an online resource and not get prompt-injected in the
process? All these are questions that have the same answer:

> You could never be certain; all you can do is hope it does or doesn't happen,
and you will know if there were issues after the deed is done.

When it comes to actions, especially complex ones, we need precision, not
optimism.

### Lack of persistent state

Another strong point I derived from content by Theo.gg and the Anthropic
article about data being stored in the model's context was about state. When we
have to use state we obtained from a previous action, that poses a problem
because best case the output is still in the context window and the model can
try to recall the output and use it in the next operation; the next best case
is the output is outside the context window and the model either hallucinates
the output or has to re-run the previous action or a similar action to get the
data before performing the next desired output; and worst case is that state
was in another session and the model has no idea.

### Blocking nature of task execution

By design, MCP stacks all actions in a queue of blocking actions and relies on
the MCP servers to handle these operations asynchronously. This ties in heavily
with my previous point about model confusion.

### No passive context

Passive context is something I developed and have worked on. It is drastically
a way of providing context to a model without the model sending a request.
Think webhooks: I could have a GitHub action that triggers a webhook and use
that as a service to send requests to the model. This is a very useful feature
in fields like robotics and security where “we do not know what we are looking
for until we see it.” MCP has no concept of that implemented in its
architecture, and this is a very useful feature that isn’t built into the MCP
spec.

### Setup overhead

MCP is not easy to get set up. It requires I know where to go to find MCP
servers for the things I want to use. These servers are also not extensive by
any means, especially for people outside of the development world. People who
want to create servers for existing services have to go on a hunt to find out
if what they are building doesn't already exist before they can go ahead to
build. It’s like having all your favorite language's libraries scattered on
GitHub, and you have to go on a search to look for the library you prefer
instead of using a package manager.

### Speed & Latency

According to the MCP specification, it uses JSON-RPC to establish communication
between hosts (models), clients, and servers. JSON requests and responses begin
to cost a lot when the amount of data being passed around increases; this in
return increases latency, making it uncomfortably slow for robotics, smart home
networks, etc. On top of that, there is no part of the standard for data
compression; there is no way for clients and servers to send compressed data,
as this will cause an error. It is also faster for tasks to be completed when
there is a script that executes it and returns the result rather than for a
model to stream the desired changes or actions “manually.” This point couples
with my previous points on model confusion, hallucination, and the blocking
nature of task execution.

### Potholes in the spec

Just like authentication, compression, and observability, there are a heap of
other issues with the MCP spec that are still waiting to be discovered. This is
a problem with other projects too, but MCP is a spec; people can just fork the
spec and make changes to it. Because of this, people will continue to try and
extend the capabilities of MCP by injecting and stacking more modifications in
ways that are in no way standard. This is one big reason behind people creating
solutions on top of MCP for services that do not even exist, and I am a prime
example of this as I have tried to implement a permission system on top of MCP
which almost escalated to a full-blown rewrite of MCP.

### Developer experience

Setting up an MCP-compliant server/client is not exactly the best experience. I
am speaking as someone who has tried to build my own SDK from following the
spec and using the SDK. The SDK of course removes a lot of overhead, but it’s
still not quite it. If I already have an interface for my server, why do I have
to build another layer on my server or a proxy that allows it to interact with
MCP? This is a problem that could be solved by just generating the utility to
properly dispatch requests and responses, and all you have to do is properly
expose endpoints.
