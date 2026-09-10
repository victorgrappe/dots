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
