---
author: Alexandre Xavier
pubDatetime: 2020-01-24T15:22:00Z
modDatetime: 2020-01-26T09:12:47.400Z
title: Composability
slug: Composability
featured: true
draft: false
tags:
  - identidade
language: pt
description:
  The Composability of Identity across the web.
---

The Composability of Identity across Web2 and Web3

A decade or two ago, your digital identity didn't mean very much. It was represented more by your email address than any social media account you had. Fast forward to today, and we've seen an increased focus on how we appear in online media by everyone: yourself, your friends, and your employers. Most of our day-to-day interactions exist in digital accounts on someone's database.

Yet all-in-all, your digital worth is measured by the engagement (and advertising revenue) garnered. Sometimes you get a share of that revenue, but for 99% of us, the value of our digital identity is locked within the platform. This doesn't just apply to Facebook, Twitter, or Reddit - the "platform" can be our workplace as well.

Let's say you've worked at a company for a few years, and you've decided to move on. When you leave the company, your reputation still stands with individuals you've worked with and in the many programs/emails you've created, but otherwise, the company's reputation is your reputation. This dynamic has slowly changed with the rise of the internet - hence the rise of the personal brand. However, your personal brand is still built off of your own word (which may or may not have much value when first starting out).

Our digital identity exists in fragments, it isn't flexible past the platform it was built on, and it has little reusability other than cross-platform authentication. We don't own our digital identity, and it's not composable at all. Now, what if you could own all of the pieces of your digital identity permanently, while also controlling who you reveal that data to and how it's represented? This would enable us to tell more compelling stories and have a user-controlled value function for identity. I think we're (finally) not so far off from a future where all of that is possible.

But the phrase "digital identity" is really complex and abstract. Let's start by sorting it into a treemap of identity type -> platform type -> transaction type -> action type.

Hierarchy of Digital Identity

I know, it's a thicc chart. Desktop viewing is best for easier zooming.
I know, it's a thicc chart. Desktop viewing is best for easier zooming.
For identity types, I've split it into physical and digital identity (physical is hidden for this article). The next layer is platform types, which I've just split into Web2 and Web3 for now. In the future, it may not be so simple to separate which platform different types of transactions are coming from. Now for the meat and potatoes of this breakdown, transaction and action types:

Social Transactions: These are transactions where you have a set individual or group of individuals you know you want to interact with.
- Individual: This is just like Venmo when you pay or interact with someone for any number of reasons
- Community: These are actions that go towards some group cause, and can be anything from funding a treasury to governing actions for spending from that treasury.
- Gaming: This is another way of saying actions where the result/end party of the action isn't always known. In many games, this is common, like going on raids or adding to/interacting with some city on your journey.

Protocol Transactions: These are transactions where you interact with a product for its specific benefits or utility.
- Selling/Acquiring: These are marketplace actions, where the protocol is used to conduct a peer-to-peer interaction.
- Staking: This is an action where you are staking your belief in a protocol, acting as a core member of the product community. The actual use of the stake may vary, but the signaling is the same.
- Use: I'm defining "use" here as the primary use case action of the protocol. Sometimes that may be "selling/acquiring" or "staking."

Conversations: These are transactions where you are trying to work with (or against) others to directly push towards some goal or understanding (in a friendly and sustainable way). In the context of this article, these conversations are focused on the growth and governance of communities/products/protocols.
- Proposals: These are like Ethereum Improvement Proposals, but can be much more general too.
- Moderation: Some examples are Reddit mods and Twitch chat mods, where they enforce rules set by proposals.
- Feedback: This is usually in direct response to proposal or moderation actions. A lot of this is providing a larger context and bridging the conversation between old and new users.

Contributions: These are transactions where you either create something or engage (without conversation) with something someone created.
- Consumption: Actions here include liking or saving an article, or running npm install on someone's node js package.
- Creation: This includes creating new ideas, products, integrations, and much more.
- Sharing: These actions contribute directly to network effects, and typically act as bridges across platforms and communities.

Our web of actions ultimately forms our digital identity. I know that even this is still pretty abstract, so let's look at how this could be realistically represented and used.

Representing Digital Identity in Practice
Here's the structure I've been working with on what digital identity on a more technical level:



The first layer is comprised of transaction types (the four we talked about) and social graphs. I didn't include social graphs as part of the identity breakdown since the graph's nodes are each their own digital identity, connected by lines that represent transactions. I've labeled this whole layer as "not composable," meaning I can't detach them from an identifier or really move them around from platform to platform to form a single identity. While transaction data is immutable, it is typically exportable and can be represented in tokens. Social graphs are more difficult to manage in a portable way, first and foremost because current platforms limit the ability to export that data. This has been a heated topic of discussion for years now, so there's a large lack of transparency on what they actually look like and how to break them down. However, new products and approaches allow you to build up and represent the nodes closest to you in the social graph - which can then also be stored into tokens. That representation as tokens brings us to the second layer of the chart.

The second layer (and onwards) highlights categories and products that allow us to represent that transaction data and/or social graph as tokens. Since tokens have the qualities of existence, flexibility, and reusability - then by the transitive property - our digital identity now does as well. I can move around these tokens at will to different accounts and in different combinations. If we add on the permission/connection rules wallets already have to the tokens' data, we're coming very close to the picture I painted at the start.

Let's talk about what's behind the tokens of this composable digital identity layer =>

Tokens built off of transaction data will likely rely on different models and algorithms that may start centralized and then transition to community-governed. These models will take different combinations of transaction and action types depending on what they want to represent. SourceCred allows custom-set rules for measuring "contributions". Spectral.finance creates machine learning credit score models that may take on a Numerai style many-model architecture in the future. I'd expect Rabbithole.gg to have some token(s) representing levels of different skills in the future, where the levels are calculated with different models. How we tokenize web2 account transaction data probably won't be that different in structure data => model => token. They may rely on existing web2 aggregators like orbit.love and their model for calculating reputation by community.

The fungible versus non-fungible identity token approach here reflects what kind of identity economies will be generated. Fungible tokens act as a standard and stable reputation coin that holds regardless of the type of community or contribution. These may help facilitate creative cross-community collaboration and creative talent acquisition, leading to new treasury management strategies and considerations. Non-fungible tokens are identity bonds that can be staked or lent out, which growing in value over time as an individual's actions continue to evolve. Identity forges (a protocol where you and I place our creditworthiness NFT to create a new representative token) will increase the utility and complexity of this token. Multiply this across all proof tokens and we have the beginnings of an "identity marketplace."

Earlier I said that social graph tokens would likely be represented by your closest nodes instead of the full graph. This comes from the two popular approaches I've seen today:

Sybil Resistant: The theory here is that if I am verified by enough other "people" who are real, then I am real. BrightID's health score reflects this, and it seems to be working well.
Tiered Entry: Let's start with 100 people who we know are real and trusted, and then bring in more people based on the selection/voting of those 100 people
With both of these approaches, your social graph is the people who verified or voted for you. Whether or not these decentralized identities (DIDs) aggregate under addresses or the other way around largely depends on how we interface with the digital world - I believe it will be the former for the same reasons we don't "login" to pages with our ENS. The tokenization of these graph shards could take many forms and will likely be layered upon by proof tokens.

All of these identity tokens represent the earliest primitives, and I'm sure they will be built upon with additional complexity as our mental and technical understanding of "trust" and "digital identity" evolve. With that as the expectation, our digital identity becomes more like a portfolio, requiring a new set of tools. We've seen community SaaS tools grow over the last few years that help product teams increase engagement with their community of users across platforms, but what I'm pushing for here is an identity management tool for the users themselves.

Building an Identity Management tool
While we have asset management tools like Zerion and Zapper, there is no "identity management tool" yet. This isn't too surprising as proof tokens are largely still under development for the Ethereum transaction data side, and most protocols still link web2 accounts independently (like mirror.xyz does when you sign up for the $WRITE race). For now, I view the product stack as follows:



The data aggregation layer should be managed by other protocols, where each protocol will have decentralized governance of standards and usage. An identity management tool would play with everything in blue, starting as a specialized SDK between all our identity tokens interactions/metadata for wallets to use. While there are many features required for managing identity, I want to start with the actions of verification and permissioning.

