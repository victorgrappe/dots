---
class:
type:
---


# Need

I am building an ontology and I want to represent this structure,:
- `Dot`is the root object
	- `Food`is a `Dot` 
		- `Apple`is a `Food`
			- `apple_1` is an `Apple`
			- `apple_2` is an `Apple`
	- `Beverage`is a `Dot`
		- `Juice`is a `Beverage`
			- `apple_juice_1`is a `Juice` 
	- `Transformation`is a `Dot`
		- `Extract`is a `Transformation`
			- `extract--apple_1--apple_juice_1`is an `Extract`


What are the different kinds of relations I need to represent this ?

What are the different way to express these relations in 
- OOP (Object Oriented Programming)
- FP (Functional Programming)
- Type Theory
- Set Theory
- Category Theory
- Homotopy Type Theory 
- Wikipedia
- 





# Relations between values, types and kinds across paradigms

Example: `apple_1`, `apple_2` are instances of `Apple`; `Apple` is a subclass of `Fruit`; `Fruit` is a subclass of `Food`.

| Relation                 | In plain words                          | OOP                      | Set theory        | Type theory                              | Category theory            | Functional programming              | HoTT / cubical Agda                                                                                |
| ------------------------ | --------------------------------------- | ------------------------ | ----------------- | ---------------------------------------- | -------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Value → type**         | "this thing *is an* Apple"              | `instanceOf`             | `apple_1 ∈ Apple` | `apple_1 : Apple`                        | global element `1 → Apple` | `apple_1 :: Apple`                  | `apple_1 : Apple` (unchanged; a point of a space)                                                  |
| **Type → supertype**     | "every Apple *is a* Fruit"              | `subclassOf` / `extends` | `Apple ⊂ Fruit`   | `Apple <: Fruit` (subtyping)             | mono `Apple ↪ Fruit`       | constructor of a sum type           | embedding `Σ (f : Fruit), IsApple f` with `IsApple` a proposition                                  |
| **Type → interface**     | "an Apple *can be used* like any Fruit" | implements               | predicate on sets | `Apple : Fruit`, `Fruit : Type → Type`   | algebras / functors        | `instance Fruit Apple` (type class) | same as type theory; structure identity principle makes equivalent implementations interchangeable |
| **Type → type of types** | "Apple *is a* kind"                     | metaclass `Apple : type` | `Apple ∈ 𝒫(U)`    | universe `Apple : Type : Type₁`          | object of `Cat`            | kind `Apple :: Type`                | `Apple : Type`, but `Type` is just another space whose paths are equivalences                      |
| **Same-as**              | "these two are *the same*"              | `==` / `equals()`        | `=` (extensional) | propositional `a = b`, distinct from `≅` | isomorphism `A ≅ B`        | `Eq` instance / pattern equality    | path `a ≡ b`; univalence: `(A ≡ B) ≃ (A ≃ B)`                                                      |

## Reading the matrix

- A data model with a single `class` relation fuses rows 1 and 2. Only naive OOP does this; it is the source of the inconsistency (`instanceOf` is not transitive, `subclassOf` is: `Apple ⊂ Fruit ⊂ Food` gives `Apple ⊂ Food`, but `apple_1 ∈ Apple` never gives "`apple_1` is a subclass of `Fruit`").
- Rows 1 and 4 are the same relation (membership) applied one level up; every column except OOP makes that visible.
- HoTT keeps row 1 untouched and instead collapses rows 2 and 5: "is-a" becomes an embedding, and "equal", "isomorphic", "subset" become instances of a single notion, paths.







# relation




|       |             |     |     |
| ----- | ----------- | --- | --- |
| class | a "is a" b  |     |     |
| type  | a "has a" b |     |     |
|       |             |     |     |



# Resources

- [[Upper ontology]], [[Formal ontology]]
	- [[BFO (Basic Formal Ontology)]]
		- https://github.com/bfo-ontology/bfo
	- [[GFO (General Formal Ontology)]]
	- [[UFO (Unified Foundational Ontology)]]
	- [[BORO (Business Objects Reference Ontology)]]
	- [[CIDOC CRM (Conceptual Reference Model)]]
	- [[Cyc]]
	- [[UMBEL]]
	- [[DOLCE]]
	- [[SUMO (Suggested Upper Merged Ontology)]]

- [[Ontology]], [[Ontology (philisophy)]]
	- [[Mereology]] (Part-whole relationships)
		- [[Meronomy]] (hierarchy that deals with part–whole relationships, in contrast to a taxonomy whose categorisation is based on discrete sets)
	- https://en.wikipedia.org/wiki/Meronomy
	- https://en.wikipedia.org/wiki/Meronymy_and_holonymy




- [[formal system]]
	- [[lambda calculus]]
		- [[typed lambda calculus]]
			- [[Pure type system]]
				- [[System U]]







https://en.wikipedia.org/wiki/Process_Specification_Language
https://en.wikipedia.org/wiki/Process_ontology
https://en.wikipedia.org/wiki/Common_Logic
https://en.wikipedia.org/wiki/Plant_lifecycle_management
https://en.wikipedia.org/wiki/Whitehead's_point-free_geometry
https://en.wikipedia.org/wiki/Alfred_North_Whitehead
https://en.wikipedia.org/wiki/Process_philosophy
https://en.wikipedia.org/wiki/Geospatial_topology
https://en.wikipedia.org/wiki/Anatomical_terms_of_location
https://en.wikipedia.org/wiki/Geometric_terms_of_location
https://en.wikipedia.org/wiki/Free_body_diagram
https://en.wikipedia.org/wiki/Chirality

https://en.wikipedia.org/wiki/Simple_Knowledge_Organization_System
https://en.wikipedia.org/wiki/Knowledge_organization_system



https://en.wikipedia.org/wiki/Reflexive_relation
https://en.wikipedia.org/wiki/Spatial_relation
https://en.wikipedia.org/wiki/Equivalence_relation


https://en.wikipedia.org/wiki/Ontology_engineering
https://en.wikipedia.org/wiki/Ontology_components
https://en.wikipedia.org/wiki/Phylogenetic_tree
https://en.wikipedia.org/wiki/Natural_language
https://en.wikipedia.org/wiki/Primitive_notion



https://en.wikipedia.org/wiki/Hierarchy
https://en.wikipedia.org/wiki/Hierarchy#Subsumptive_containment_hierarchy
https://en.wikipedia.org/wiki/Element_of_a_set
https://en.wikipedia.org/wiki/Subset
https://en.wikipedia.org/wiki/Involution_(mathematics)
https://en.wikipedia.org/wiki/Arity

https://en.wikipedia.org/wiki/OntoClean
https://fr.slideshare.net/slideshow/onto-clean-methodology/7187577#2



https://plato.stanford.edu/entries/material-constitution/


Statue and Lump" paradox