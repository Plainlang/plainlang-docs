---
title: "On the Concept of :Concept:"
---

import dddBookImg from "./img/domain-driven-design-book.jpg";
import refactoringToolImg from "./img/concept-refactoring-tool.png";

# The :Concept: Notation in \*\*\*plain Specifications

One of the most persistent objections raised by software developers against using specifications as the source of truth is the inherent ambiguity of natural language. Words and sentences that appear clear to a human reader often admit multiple interpretations, especially when removed from their original social, organizational, or conversational context.

This ambiguity is largely tolerable when specifications serve only as informal documentation or high-level guidance. However, ambiguity becomes an engineering problem when specifications are treated as the source of truth and used as inputs for code generation, and therefore must be managed explicitly.

In spec-driven development, ambiguity first needs to be detected — either through automated detection or by a developer noticing that the software is not behaving as intended. Once identified, the developer can respond either by strengthening the specification itself or by explicitly handling special cases where ambiguity arises[^1].

This whitepaper focuses on the first approach \- strengthening the specification itself \- by introducing a new syntactic feature of the \*\*\*plain specification language: the :Concept: notation. Its purpose is to help developers refine their specifications in ways that reduce the risk of misinterpretation when the specifications are reviewed by human developers or used by AI to fully automatically generate software code. But before describing this new syntactic feature in detail, we take a step back and examine the inherent ambiguity of natural language that makes such a construct necessary, using the English word “*task*” as an example.

## The Illusion of Singular Meaning

In English, the word “*task*” is commonly defined as a piece of work to be done. At first glance, this definition seems simple and precise. Yet, despite this apparent singular meaning, the word “*task*” is used in a surprisingly wide variety of ways, depending on who performs it and on the nature of the work involved.

* My main **task** today is finishing the presentation.  
* Managing customer complaints is part of her **task**.  
* The system can run multiple **tasks** at the same time.  
* Building trust is not an easy **task**.

Although the same word appears in each sentence, it does not carry exactly the same meaning in all cases. We can make this polysemy visible by replacing the word “*task*” with another word that better preserves the intended meaning in each context:

* My main **job** today is finishing the presentation.  
* Managing customer complaints is part of her **responsibility**.  
* The system can run multiple **processes** at the same time.  
* Building trust is not an easy **undertaking**.

These substitutions show that the word “*task*” functions as a flexible, context-dependent concept rather than a single, fixed unit of meaning. Depending on the situation, it can refer to a duty, a role, a technical operation, or a broader challenge \- distinct ideas that happen to share the same linguistic label.

Let’s now imagine that a developer using \*\*\*plain writes the following specs without any additional context:

```plainlang
Write a task manager app.
```

When used to generate software code, the \*\*\*plain renderer will most likely interpret this specification as follows:

*“Write a task manager app for an individual user that organizes concrete to-do items. Tasks should have priorities, deadlines, and a clear done/not-done state.”*

But the \*\*\*plain renderer is using large language models (LLMs) on the backend which are probabilistic in nature. It is therefore entirely possible that an LLM will understand the instruction in one of the following alternative ways:

*“Write a task manager app that treats tasks as responsibilities assigned to people or roles. Tasks may be ongoing areas of accountability rather than single actions.”*

*“Write a task manager app that manages tasks as executable system processes. Tasks should be schedulable, observable, and capable of running concurrently.”*

*“Write a task manager app for managing complex, long-term undertakings. Tasks should represent goals that evolve over time and consist of multiple efforts or milestones.”*

What is striking here is that a large part of the specification’s meaning hinges on a single word. Although the sentence is short, one term carries most of the interpretive load, determining not just behavior but the entire nature of the system being built.

How this kind of concentrated ambiguity is handled depends on who \- or what \- is interpreting the specification.

A human developer, when given such a specification, would immediately recognize that they have never been given a similar specification before and that multiple interpretations are possible. Social norms, professional expectations, and fear of misunderstanding would strongly bias them toward the most conventional meaning \- or prompt them to ask for clarification.

\*\*\*plain renderer does not possess access to social, organizational, or professional norms and memories used by humans to resolve ambiguity in such situations. If a specification admits multiple valid interpretations, the underlying large language model has no basis for determining which interpretation is intended beyond statistical inference over training data and prompt context. Consequently, unless meanings are made explicit, multiple interpretations remain viable, and the generated output may reflect any of them.

If ambiguity in natural language is unavoidable, then specifications need a way to make meaning explicit once and reuse it consistently to function as a reliable source of truth.

## Fixing Meaning in Specifications with :Concept: Notation 

Let’s say that the developer realizes, either on their own or with the help of a tool, that the word “*task*” has multiple interpretations in a given context and wants to make their intended meaning explicit in the specifications. One option is to disambiguate every occurrence of the word in its specific context, as we did above for the different interpretations of the task manager app. However, if the specifications are long and the word is used frequently, this approach quickly becomes cumbersome.

A more scalable approach is to provide an explicit definition once and reuse it consistently throughout the specifications. For example, we could define the word “*task*” as follows:

```plainlang
- Task describes an activity that needs to be done by the user.
```

With this definition in place, the specification strongly indicates that the developer’s intention is to describe a personal productivity application rather than a system for managing responsibilities, computational processes, or long-term undertakings.

But now imagine a longer specification containing dozens of words that may require disambiguation. How would the developer know which words have already been explicitly defined and which still have the potential for misinterpretation? In text written for humans, a common way to draw attention to key concepts is to capitalize and bold them (see Figure 1 for an example).

<figure style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <img
    src={dddBookImg}
    alt="Figure 1: A page from Domain-Driven Design with key concepts explicitly marked in bold."
    style={{ width: "75%", height: "auto", display: "block" }}
  />
  <figcaption style={{ textAlign: "center" }}>
    Figure 1: A page from <em>Domain-Driven Design</em> with key concepts explicitly marked in bold.
  </figcaption>
</figure>

Applied to our example, this approach would look like the following:

```plainlang
- **Task** describes an activity that needs to be done by the user.

Write an app for managing **Tasks**.
```

When reviewing the specification, the developer may then notice that the word “*app*” is another term whose meaning is not yet explicit and could therefore be misinterpreted. For example, the \*\*\*plain renderer might assume that the developer intends a web or mobile application, while the developer is actually aiming for a console application written in Python. To avoid this ambiguity, the developer can make the intended meaning explicit by providing a definition:

```plainlang
- **App** is a Python console application.
```

The functional specification can then be updated accordingly:

```plainlang
Write an **App** for managing **Tasks**.
```

\*\*\*plain specifications are ASCII files and therefore have no intrinsic notion of semantic emphasis such as bold or italics. At the same time, \*\*\*plain adopts Markdown conventions for readability, where bold text \- indicated using \*\* \- serves purely as a visual cue for human readers. Assigning semantic meaning to this presentational convention would blur the distinction between human-oriented formatting and machine-interpretable structure.

For this reason, \*\*\*plain introduces a dedicated notation for concepts rather than overloading Markdown syntax. After evaluating several alternatives with respect to readability, ease of parsing, and low collision with natural language, we adopted a notation in which concept names are enclosed in colons at both the beginning and the end.

Here’s how our running example looks using this convention:

```plainlang
- :App: is a Python console application.

- :Task: describes an activity that needs to be done by the user.

Write :App: for managing :Task: items.
```

Concept names must not contain spaces and may include only letters, digits, and a limited set of special characters such as dots and underscores. This constraint ensures that concepts are easy to recognize programmatically while remaining readable to humans.

The goal of :Concept: is not to eliminate natural language or replace it with a formal ontology, but to provide a mechanism for anchoring meaning where ambiguity is costly while preserving the flexibility of prose elsewhere[^2]. Accordingly, :Concept: notation is a precision tool rather than a requirement: words like "*console*", "*describes*", or "*activity*" may appear without it when the developer does not intend to constrain their interpretation.

To make programmatic tools more robust and easier to develop, \*\*\*plain does not treat plural forms of concept names as syntactic variants of their singular counterparts. Instead, each concept name is interpreted as a distinct concept. As a result, plurality must be expressed through surrounding language \- for example, by writing :Task: items rather than relying on a pluralized concept name such as :Tasks:.

In this whitepaper, we use bold typeface solely to help readers quickly identify key concepts. In an editor, an automatic concept-detection tool could assist the developer not only by highlighting concepts written in :Concept: notation, but also by providing utilities such as quick access to concept definitions and an overview of where each concept is used elsewhere in the specifications (see Figure 2 for an example of such a tool).

<figure style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <img
    src={refactoringToolImg}
    alt="Figure 1: A page from Domain-Driven Design with key concepts explicitly marked in bold."
    style={{ width: "75%", height: "auto", display: "block" }}
  />
  <figcaption style={{ textAlign: "center" }}>
    Figure 2: A screenshot of an IDE where a concept is renamed using refactoring functionality.
  </figcaption>
</figure>

## Making Concepts Machine-Checkable

While the :Concept: notation makes key concepts explicit and visible to human readers, it delivers real value to developers when those concepts give tools something to check against, making ambiguity easier to spot. To support this and to make checks reliable, \*\*\*plain defines a small set of rules that govern how concepts written in :Concept: notation are introduced and used.

1. **Concepts must be defined before they can be used.**  
2. **Definitions must begin with concept names.**  
3. **Concepts must not be redefined.**  
4. **Concept names are case sensitive.**  
5. **Concepts must not change meaning through use.**

Together, these rules establish the conditions under which concepts can be checked reliably and used consistently, making ambiguity easier to surface in practice. The reasoning behind each rule is outlined below.

### 1. Concepts must be defined before they can be used

The primary goal of requiring that a concept be explicitly defined before it can be used is to ensure that the specification commits to a single, intended meaning for that concept throughout the specifications. When a developer chooses to use the :Concept: notation, they are signaling that the word or phrase should be treated as a stable unit of meaning rather than as an ordinary, context-dependent term.

This requirement also helps surface errors early. By requiring that every concept be explicitly defined as part of the specification, a misspelled concept name is no longer indistinguishable from a new one. Tools can therefore detect typos, accidental variations in naming, and unintended introductions of new concepts rather than allowing such issues to silently introduce ambiguity.

In \*\*\*plain, concepts must be defined in the definitions section[^3], which is denoted by a special heading.

Centralizing concept definitions in a dedicated section makes them easy to review, reference, and reason about as a coherent vocabulary, while keeping the remainder of the specification focused on behavior and constraints.

Here is the full example:

```plainlang
***definitions***

- :App: is a Python console application.

- :Task: describes an activity that needs to be done by the user.

***functional specs***

Write :App: for managing :Task: items.
```

This rule introduces a level of rigor that is not present in typical prose writing, where terms are often introduced casually and clarified later. That tradeoff is deliberate. \*\*\*plain specifications are not merely read by humans but are also used as input for automatic code generation. Prioritizing explicit meaning and unambiguous interpretation over narrative flow reduces the risk of speculative or inconsistent interpretations during generation.

### 2. Definitions must begin with concept names

In \*\*\*plain, every concept definition must begin with the concept name itself, written using :Concept: notation. This requirement exists to make such definitions immediately recognizable and unambiguous, both for programmatic tools and for human readers.

Requiring definitions to begin with the concept name does not reduce the expressivity of the developer. Any natural-language definition can be rewritten to satisfy this constraint without loss of meaning. For example, a developer might initially write:

```plainlang
- An activity that needs to be done by the user is called :Task:
```

This definition can be rewritten in canonical form as:

```plainlang
- :Task: describes an activity that needs to be done by the user.
```

By enforcing a single canonical form for definitions, \*\*\*plain separates what a concept means from how a developer might naturally phrase that meaning in prose. Developers remain free to use natural language in definitions, but the structural role of a definition is made explicit and mechanically checkable.

### 3. Concepts must not be redefined

In larger specifications, it would be easy to miss that a concept has already been defined elsewhere if redefinition were allowed. More importantly, permitting redefinition would allow multiple, potentially conflicting meanings to coexist under the same name, undermining the purpose of introducing explicit concepts in the first place.

\*\*\*plain supports modular specification structure[^4]. As a result, a concept definition is not necessarily visible in all parts of the specification, but only in the parts where it is explicitly defined or imported.

Despite this limited visibility, \*\*\*plain requires that each concept name be globally unique across the entire specification as seen by the renderer after resolving imports.

The motivation for this rule is primarily human, not technical. Once a human reader encounters a concept name and associates it with a particular meaning, there is no reliable mechanism for “forgetting” that association when the same name is later reused with a different meaning. Allowing the same concept name to denote different ideas in different modules would therefore create persistent confusion, even if those modules are technically separate.

This restriction also applies in cases where reusing a name might seem reasonable \- for example, when different parts of a system use the same word to mean different things. \*\*\*plain intentionally forbids such reuse. Instead, developers are expected to choose distinct, explicit names (e.g. :UserTask: versus :SystemTask:), favoring clarity over reliance on contextual interpretation.

To illustrate the problem, consider two modules:

- One module defines :Task: as an activity performed by a user.  
- Another module defines :Task: as a schedulable system process.

If a third module imports both, the name :Task: can no longer serve as a stable anchor of meaning. Even if tools could technically distinguish the two definitions, a human reader could not do so without constantly tracking context, defeating the goal of making meaning explicit and reusable.

For this reason, \*\*\*plain treats concept names as global commitments rather than local conveniences. Introducing a concept name establishes a single, stable unit of meaning that applies wherever that name appears. Prohibiting redefinition preserves that stability and ensures that both humans and tools can rely on concept names as unambiguous references throughout the specification.

### 4. Concept names are case sensitive

In \*\*\*plain, the developer is free to name concepts using any combination of the following ASCII characters:

- uppercase and lowercase letters (ASCII characters 65 to 90 and 97 to 122\)  
- digits (ASCII characters 48 to 57\)  
- special characters  
  - plus sign (+, ASCII character 43\)  
  - minus sign (-, ASCII character 45\)  
  - dot sign (., ASCII character 46\)  
  - underscore (\_, ASCII character 95\)

We intentionally place very few restrictions on concept names in \*\*\*plain in order to give developers maximum freedom to express domain vocabulary in a way that feels natural and familiar to them. The primary motivation for excluding certain characters \- most notably the space character \- is to keep programmatic detection and validation of concepts simple and robust.

One deliberately opinionated decision concerns case sensitivity. In \*\*\*plain, concept names are case sensitive: :Task: and :task: denote two distinct concepts.

This choice follows directly from \*\*\*plain’s overarching goal of making meaning explicit rather than implicit. Treating concept names as case-insensitive would require either normalizing case automatically or silently aliasing differently cased names to the same concept. Both approaches introduce implicit behavior that hides distinctions rather than forcing them to be made explicit.

Case sensitivity ensures that any change to the spelling or casing of a concept name is treated as a change in meaning. If a developer writes :Task: in one place and :task: in another, \*\*\*plain does not attempt to guess whether this was intentional. Instead, it treats the difference as semantically significant and allows tools to flag it as a potential error. This shifts ambiguity from silent interpretation to explicit detection.

Case sensitivity does introduce the possibility of accidental variation, particularly during editing. \*\*\*plain intentionally addresses this risk through tooling rather than language semantics. Editors, linters, and renderers are expected to assist developers by highlighting unknown concepts, suggesting canonical casing, and flagging near-miss variants. In doing so, \*\*\*plain preserves precision at the language level while relying on tools to support usability.

By making case sensitivity a rule rather than a convention, \*\*\*plain reinforces the idea that concept names are not merely stylistic labels but explicit commitments to meaning. A difference in name \- however small \- is treated as a difference in concept, and therefore demands explicit intent.

### 5. Concepts must not change meaning through use

Philosophers of language[^5] have long pointed out that words do not carry meaning in isolation. Instead, meaning emerges through how words and concepts are used in context. As a result, a concept’s meaning is not fixed solely by its explicit definition; it is also shaped \- and can be distorted \- by how it is used in the specification text.

Let’s take as an example the definition of :Task: from before:

```plainlang
- :Task: describes an activity that needs to be done by the user.
```

If we were to allow the following functional specification, we would introduce significant ambiguity about the intended meaning of the concept :Task::

```plainlang
- :App: should be capable of running **:Task:** items concurrently.
```

In this case, it is no longer clear whether :Task: refers to a duty performed by the user or to a technical operation executed by the system. In other words, the concept is implicitly redefined through its use, even though its explicit definition has not changed.

Unlike the previous rules, this constraint cannot be enforced purely syntactically and necessarily relies on semantic analysis of how concepts are used throughout the specification. Enforcement of this rule is based on consistency checks between a concept’s definition and its use. A particular use is considered problematic when a reasonable reader \-  including an LLM \- could infer that it conflicts with the concept’s stated meaning. The goal of these checks is to surface situations where meaning may drift, so the specification can be strengthened to eliminate the ambiguity.

By enforcing stability of meaning through use, this rule ensures that concepts function as reliable anchors of intent. Once introduced, a concept name constitutes a commitment not only to a definition, but to a consistent and coherent pattern of use throughout the specification. Where a substantially different meaning is required, a new and explicit concept name must be introduced, preserving the original concept as a stable unit of meaning.

## Summary

Natural language is inherently ambiguous, and that ambiguity does not disappear when specifications are used as input for automatic code generation. Certain words in a specification play a disproportionate role in shaping interpretation, and when their meaning is left implicit, even a capable renderer may adopt a plausible but unintended interpretation of the specification.

By introducing the :Concept: notation, \*\*\*plain makes decisions about the meaning of key terms explicit in the specification rather than leaving them to be inferred during code generation, where such inferences are implicit, hard to inspect, and difficult to correct. What began as an ambiguous word like “*task*” becomes, through :Concept:, a stable unit of meaning that both humans and tools can rely on.

The :Concept: notation and its accompanying rules provide a disciplined way to define, reuse, and validate such concepts without turning specifications into formal ontologies or rigid schemas. Where precision is required, they strengthen specifications by making key meanings explicit and stable, while allowing natural language to remain expressive elsewhere.

[^1]: See the blog post [Beyond Vibe Coding](https://blog.codeplain.ai/p/beyond-vibe-coding) for background.
[^2]: Readers familiar with Domain-Driven Design may notice a resemblance between concepts in \*\*\*plain and the Ubiquitous Language. This resemblance is not accidental. Both approaches are motivated by the same underlying problem: the ambiguity of natural language. The difference lies not in the problem they address, but in where ambiguity arises and how it can be resolved. Ubiquitous Language assumes that ambiguity can be detected, discussed, and repaired through interaction between developers and domain experts. :Concept: notation, on the other hand, improves how humans communicate intent to the \*\*\*plain renderer by making fewer things guessable and more things explicit.
[^3]: The other sections are *technical specs*, *test specs*, and *functional specs*. More information about these sections will be provided in a follow up whitepaper.
[^4]: The details of the support for modular specification structure in \*\*\*plain will be provided in a follow up whitepaper.
[^5]: Ludwig Wittgenstein, Philosophical Investigations