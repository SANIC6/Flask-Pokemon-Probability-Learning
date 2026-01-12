/**
 * Lesson data with quiz variants for Pokemon Probability Academy
 * Each lesson has 3 quiz variants to prevent repetition
 */

export const lessons = [
    {
        id: 1,
        title: "Introduction to Probability",
        spriteId: 129, // Magikarp (represents randomness/probability)
        content: `
            <h3>What is Probability?</h3>
            <p>Probability tells us how likely something is to happen. We express it as a number between 0 and 1:</p>
            <ul>
                <li><strong>0</strong> means impossible (catching a Fire-type in the ocean)</li>
                <li><strong>1</strong> means certain (getting heads or tails on a coin flip)</li>
                <li><strong>0.5</strong> means equally likely (choosing Bulbasaur or Charmander randomly)</li>
            </ul>
            <h3>Sample Space</h3>
            <p>The <strong>sample space</strong> is all possible outcomes of an event.</p>
            <div class="example-box">
                <p><strong>Example:</strong> Flipping a coin to decide who goes first.</p>
                <p>Sample space = {Heads, Tails}</p>
            </div>
        `,
        interactive: 'coin-flip',
        quizzes: [
            {
                variant: 1,
                questions: [
                    {
                        question: "What is the probability of an impossible event?",
                        choices: ["0", "0.5", "1", "-1"],
                        correctIndex: 0,
                        explanation: "An impossible event has a probability of 0, meaning it will never happen."
                    },
                    {
                        question: "If you flip a fair coin, what is P(Heads)?",
                        choices: ["0", "0.25", "0.5", "1"],
                        correctIndex: 2,
                        explanation: "A fair coin has two equally likely outcomes, so P(Heads) = 1/2 = 0.5"
                    },
                    {
                        question: "What is the sample space when rolling a standard die?",
                        choices: ["{1, 2, 3}", "{1, 2, 3, 4, 5, 6}", "{0, 1, 2, 3, 4, 5}", "{2, 4, 6}"],
                        correctIndex: 1,
                        explanation: "A standard die has 6 faces numbered 1 through 6."
                    }
                ]
            },
            {
                variant: 2,
                questions: [
                    {
                        question: "What is the probability of a certain event?",
                        choices: ["0", "0.5", "1", "Undefined"],
                        correctIndex: 2,
                        explanation: "A certain event always happens, so it has probability 1."
                    },
                    {
                        question: "You have 3 Pokeballs. What's P(selecting a specific one randomly)?",
                        choices: ["1/3", "1/2", "2/3", "1"],
                        correctIndex: 0,
                        explanation: "There are 3 equally likely choices, so P = 1/3 ≈ 0.33"
                    },
                    {
                        question: "Which value CANNOT be a probability?",
                        choices: ["0", "0.75", "1", "1.5"],
                        correctIndex: 3,
                        explanation: "Probabilities must be between 0 and 1 inclusive. 1.5 is impossible."
                    }
                ]
            },
            {
                variant: 3,
                questions: [
                    {
                        question: "If P(catching Pikachu) = 0.2, what does this mean?",
                        choices: [
                            "You'll never catch it",
                            "You'll definitely catch it",
                            "There's a 20% chance",
                            "There's an 80% chance"
                        ],
                        correctIndex: 2,
                        explanation: "0.2 = 20/100 = 20% chance of catching Pikachu."
                    },
                    {
                        question: "What's the sample space for choosing a Kanto starter?",
                        choices: [
                            "{Bulbasaur, Charmander}",
                            "{Bulbasaur, Charmander, Squirtle}",
                            "{All 151 Pokemon}",
                            "{Pikachu}"
                        ],
                        correctIndex: 1,
                        explanation: "The three Kanto starters are Bulbasaur, Charmander, and Squirtle."
                    },
                    {
                        question: "If you have 10 cards and pick one, what's P(selecting that card)?",
                        choices: ["0.01", "0.1", "0.5", "1"],
                        correctIndex: 1,
                        explanation: "With 10 equally likely choices, P = 1/10 = 0.1"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Union, Intersection, and Complement",
        spriteId: 6, // Charizard (Fire/Flying - represents union/intersection)
        content: `
            <h3>Union (A ∪ B)</h3>
            <p>Outcomes where <strong>at least one</strong> event happens.</p>
            <p><em>Example: Catching a Fire-type OR a Flying-type (Charizard is both!)</em></p>
            
            <h3>Intersection (A ∩ B)</h3>
            <p>Outcomes where <strong>both</strong> events happen.</p>
            <p><em>Example: Pokemon that are Water-type AND have high defense (Blastoise).</em></p>
            
            <h3>Complement (A^C)</h3>
            <p>Everything that is <strong>NOT</strong> the event.</p>
            <p><em>Example: If A is catching a Grass-type, A^C is catching anything else.</em></p>
        `,
        interactive: 'venn-diagram',
        quizzes: [
            {
                variant: 1,
                questions: [
                    {
                        question: "What does A ∪ B represent?",
                        choices: [
                            "Events in both A and B",
                            "Events in A or B or both",
                            "Events not in A",
                            "Only events in A"
                        ],
                        correctIndex: 1,
                        explanation: "Union (∪) means 'or' - anything in A, or B, or both."
                    },
                    {
                        question: "If A = {Fire-types} and B = {Flying-types}, what is A ∩ B?",
                        choices: [
                            "All Fire or Flying types",
                            "Only Fire types",
                            "Pokemon that are both Fire AND Flying",
                            "Neither Fire nor Flying"
                        ],
                        correctIndex: 2,
                        explanation: "Intersection (∩) means 'and' - Pokemon with both types, like Charizard or Moltres."
                    },
                    {
                        question: "If P(A) = 0.6, what is P(A^C)?",
                        choices: ["0.6", "0.4", "1", "0"],
                        correctIndex: 1,
                        explanation: "The complement rule: P(A^C) = 1 - P(A) = 1 - 0.6 = 0.4"
                    }
                ]
            },
            {
                variant: 2,
                questions: [
                    {
                        question: "Which symbol represents intersection?",
                        choices: ["∪", "∩", "^C", "→"],
                        correctIndex: 1,
                        explanation: "∩ is the intersection symbol, meaning 'and' or 'both'."
                    },
                    {
                        question: "If you catch a Pokemon that's NOT Water-type, you caught:",
                        choices: [
                            "Water ∪ Fire",
                            "Water ∩ Grass",
                            "Water^C",
                            "Water"
                        ],
                        correctIndex: 2,
                        explanation: "NOT Water-type is the complement of Water, written as Water^C."
                    },
                    {
                        question: "If P(Fire) = 0.3, P(Water) = 0.4, and these are mutually exclusive, what is P(Fire ∪ Water)?",
                        choices: ["0.7", "0.12", "0.1", "1"],
                        correctIndex: 0,
                        explanation: "For mutually exclusive events, P(A ∪ B) = P(A) + P(B) = 0.3 + 0.4 = 0.7"
                    }
                ]
            },
            {
                variant: 3,
                questions: [
                    {
                        question: "What does 'complement' mean in probability?",
                        choices: [
                            "Events that happen together",
                            "Everything that is NOT the event",
                            "Events that are equally likely",
                            "Events that depend on each other"
                        ],
                        correctIndex: 1,
                        explanation: "The complement of an event is everything in the sample space that is NOT that event."
                    },
                    {
                        question: "If A and B are mutually exclusive, what is A ∩ B?",
                        choices: ["A ∪ B", "Empty set (nothing)", "A", "B"],
                        correctIndex: 1,
                        explanation: "Mutually exclusive means they can't both happen, so their intersection is empty."
                    },
                    {
                        question: "P(catching a Pokemon) + P(not catching a Pokemon) = ?",
                        choices: ["0", "0.5", "1", "Depends on the Pokemon"],
                        correctIndex: 2,
                        explanation: "An event and its complement always sum to 1. This is the complement rule."
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Independence and Dependence",
        spriteId: 4, // Charmander
        content: `
            <h3>Independent Events</h3>
            <p>One event doesn't change the probability of the other.</p>
            <p><em>Example: Flipping a coin twice. The coin doesn't remember the first flip!</em></p>
            
            <h3>Dependent Events</h3>
            <p>The first event changes the probability of the second.</p>
            <p><em>Example: Drawing a card and NOT putting it back. The deck is smaller now!</em></p>
        `,
        quizzes: [
            {
                variant: 1,
                questions: [
                    {
                        question: "Which describes independent events?",
                        choices: [
                            "One event affects the other",
                            "Events cannot both happen",
                            "One event doesn't affect the other",
                            "Events must happen together"
                        ],
                        correctIndex: 2,
                        explanation: "Independent events don't influence each other - knowing one happened doesn't change the probability of the other."
                    },
                    {
                        question: "You flip a coin twice. Are the flips independent?",
                        choices: ["Yes", "No", "Only if you get heads", "Only if you get the same result"],
                        correctIndex: 0,
                        explanation: "Coin flips are independent - the coin has no memory of previous flips."
                    },
                    {
                        question: "You draw a card from a deck and DON'T replace it. Is the second draw independent?",
                        choices: ["Yes", "No", "Only for face cards", "Only if you shuffle"],
                        correctIndex: 1,
                        explanation: "The second draw is dependent because the deck composition changed after the first draw."
                    }
                ]
            },
            {
                variant: 2,
                questions: [
                    {
                        question: "Which is an example of dependent events?",
                        choices: [
                            "Rolling two different dice",
                            "Flipping two coins",
                            "Drawing two cards without replacement",
                            "Two separate Pokemon encounters"
                        ],
                        correctIndex: 2,
                        explanation: "Without replacement, the first draw affects what's available for the second draw."
                    },
                    {
                        question: "If A and B are independent and P(A) = 0.4, P(B) = 0.5, what is P(A and B)?",
                        choices: ["0.9", "0.2", "0.1", "0.4"],
                        correctIndex: 1,
                        explanation: "For independent events: P(A and B) = P(A) × P(B) = 0.4 × 0.5 = 0.2"
                    },
                    {
                        question: "You encounter a Pokemon. The weather changes. Are these independent?",
                        choices: [
                            "No, weather affects encounter rates",
                            "Yes, they're unrelated",
                            "Only in summer",
                            "Only for Water types"
                        ],
                        correctIndex: 1,
                        explanation: "In this scenario, we assume the Pokemon encounter and weather change are unrelated independent events."
                    }
                ]
            },
            {
                variant: 3,
                questions: [
                    {
                        question: "If events are independent, knowing one happened:",
                        choices: [
                            "Increases probability of the other",
                            "Decreases probability of the other",
                            "Doesn't change probability of the other",
                            "Makes the other impossible"
                        ],
                        correctIndex: 2,
                        explanation: "Independent events don't affect each other's probabilities."
                    },
                    {
                        question: "Which pair is most likely independent?",
                        choices: [
                            "Drawing two cards from the same deck without replacement",
                            "Catching Pokemon in two different regions",
                            "Evolution stage and Pokemon type",
                            "HP and Defense stats"
                        ],
                        correctIndex: 1,
                        explanation: "Events in different regions are independent - one doesn't affect the other."
                    },
                    {
                        question: "If P(A|B) = P(A), what does this tell us?",
                        choices: [
                            "A and B are dependent",
                            "A and B are independent",
                            "A and B are mutually exclusive",
                            "A causes B"
                        ],
                        correctIndex: 1,
                        explanation: "If knowing B doesn't change P(A), then A and B are independent."
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Mutually Exclusive Events",
        spriteId: 133, // Eevee (The perfect example of mutually exclusive evolution)
        content: `
            <h3>What Are They?</h3>
            <p>Two events that cannot happen at the same time.</p>
            <div class="example-box">
                <p><strong>Eevee Evolution:</strong> Eevee can evolve into Vaporeon, Jolteon, OR Flareon. Once it evolves into one, it <strong>cannot</strong> become the others!</p>
            </div>
            <h3>Addition Rule</h3>
            <p>For mutually exclusive events: <strong>P(A or B) = P(A) + P(B)</strong></p>
            <p>Since they can't happen together, we just add their probabilities.</p>
        `,
        interactive: 'eevee-evolution',
        quizzes: [
            {
                variant: 1,
                questions: [
                    {
                        question: "What defines mutually exclusive events?",
                        choices: [
                            "They always happen together",
                            "They cannot both happen",
                            "They are independent",
                            "They have equal probability"
                        ],
                        correctIndex: 1,
                        explanation: "Mutually exclusive events cannot occur simultaneously. Eevee cannot be both Vaporeon and Jolteon."
                    },
                    {
                        question: "If P(Vaporeon) = 0.3 and P(Jolteon) = 0.4, what is P(Vaporeon or Jolteon)?",
                        choices: ["0.12", "0.7", "0.1", "1"],
                        correctIndex: 1,
                        explanation: "For mutually exclusive events: P(A or B) = P(A) + P(B) = 0.3 + 0.4 = 0.7"
                    },
                    {
                        question: "Which of these is mutually exclusive?",
                        choices: [
                            "Getting heads and tails on one coin flip",
                            "Catching Fire-type and Water-type Pokemon in general",
                            "Rolling even and rolling prime on a die",
                            "Being tall and being fast"
                        ],
                        correctIndex: 0,
                        explanation: "A single coin flip can only be heads OR tails, never both."
                    }
                ]
            },
            {
                variant: 2,
                questions: [
                    {
                        question: "If events A and B are mutually exclusive, what is P(A and B)?",
                        choices: ["P(A) + P(B)", "P(A) × P(B)", "0", "1"],
                        correctIndex: 2,
                        explanation: "Mutually exclusive events can't both happen, so P(A and B) = 0."
                    },
                    {
                        question: "Can Eevee evolve into Vaporeon AND Flareon at the same time?",
                        choices: ["Yes", "No", "Only with a glitch", "Depends on the level"],
                        correctIndex: 1,
                        explanation: "No! Evolution is a mutually exclusive path. Choosing one locks out the others."
                    },
                    {
                        question: "If three events are mutually exclusive with P = 0.2, 0.3, 0.4, what's P(any one occurs)?",
                        choices: ["0.024", "0.9", "0.3", "1"],
                        correctIndex: 1,
                        explanation: "P(A or B or C) = 0.2 + 0.3 + 0.4 = 0.9 for mutually exclusive events."
                    }
                ]
            },
            {
                variant: 3,
                questions: [
                    {
                        question: "Can mutually exclusive events also be independent?",
                        choices: [
                            "Yes, always",
                            "No, unless P = 0",
                            "Only if P = 0.5",
                            "Yes, if they're complementary"
                        ],
                        correctIndex: 1,
                        explanation: "Mutually exclusive events (with P>0) are deeply dependent: if one happens, the other becomes impossible (Probability drops to 0)."
                    },
                    {
                        question: "Which choice represents mutually exclusive events?",
                        choices: [
                            "Using a Water Stone vs Fire Stone on one Eevee",
                            "Choosing a Grass-type to catch",
                            "Catching both eventually",
                            "Trading for another"
                        ],
                        correctIndex: 0,
                        explanation: "You can only use one stone on that specific Eevee."
                    },
                    {
                        question: "If A and B are mutually exclusive and P(A) = 0.7, what's the maximum value of P(B)?",
                        choices: ["0.7", "0.3", "0.5", "1"],
                        correctIndex: 1,
                        explanation: "Since P(A or B) ≤ 1, and P(A or B) = P(A) + P(B), then P(B) ≤ 1 - 0.7 = 0.3"
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "The Addition Rule",
        spriteId: 25, // Pikachu (iconic, represents calculation)
        content: `
            <h3>General Formula</h3>
            <p><strong>P(A or B) = P(A) + P(B) - P(A and B)</strong></p>
            <p>We subtract the intersection so we don't count it twice!</p>
            <div class="example-box">
                <p><strong>Pokemon Example:</strong></p>
                <p>P(Fire) = 0.3</p>
                <p>P(Rare) = 0.2</p>
                <p>P(Fire AND Rare) = 0.08</p>
                <p>P(Fire OR Rare) = 0.3 + 0.2 - 0.08 = 0.42</p>
            </div>
        `,
        interactive: 'addition-calc',
        quizzes: [
            {
                variant: 1,
                questions: [
                    {
                        question: "Why do we subtract P(A and B) in the addition rule?",
                        choices: [
                            "To make the answer smaller",
                            "Because we counted it twice",
                            "To find the complement",
                            "Because events are independent"
                        ],
                        correctIndex: 1,
                        explanation: "P(A and B) is counted in both P(A) and P(B), so we subtract it once to avoid double-counting."
                    },
                    {
                        question: "If P(A) = 0.5, P(B) = 0.4, P(A∩B) = 0.2, what is P(A∪B)?",
                        choices: ["0.9", "0.7", "0.1", "1.1"],
                        correctIndex: 1,
                        explanation: "P(A∪B) = 0.5 + 0.4 - 0.2 = 0.7"
                    },
                    {
                        question: "When does P(A or B) = P(A) + P(B)?",
                        choices: [
                            "When A and B are independent",
                            "When A and B are mutually exclusive",
                            "Always",
                            "Never"
                        ],
                        correctIndex: 1,
                        explanation: "When mutually exclusive, P(A and B) = 0, so P(A or B) = P(A) + P(B) - 0"
                    }
                ]
            },
            {
                variant: 2,
                questions: [
                    {
                        question: "If P(Fire) = 0.4, P(Flying) = 0.3, P(Fire∩Flying) = 0.1, find P(Fire∪Flying):",
                        choices: ["0.7", "0.6", "0.8", "0.5"],
                        correctIndex: 1,
                        explanation: "P(Fire∪Flying) = 0.4 + 0.3 - 0.1 = 0.6"
                    },
                    {
                        question: "Can P(A or B) ever be greater than 1?",
                        choices: [
                            "Yes, if P(A) and P(B) are large",
                            "No, probabilities max at 1",
                            "Yes, for dependent events",
                            "Only if using percentages"
                        ],
                        correctIndex: 1,
                        explanation: "Probabilities are always between 0 and 1. P(A or B) ≤ 1 always."
                    },
                    {
                        question: "If P(A) = 0.6, P(B) = 0.5, what's the minimum possible value of P(A or B)?",
                        choices: ["0.5", "0.6", "1.1", "0"],
                        correctIndex: 1,
                        explanation: "Minimum when B⊆A, so P(A∪B) = P(A) = 0.6"
                    }
                ]
            },
            {
                variant: 3,
                questions: [
                    {
                        question: "The addition rule applies to:",
                        choices: [
                            "Only mutually exclusive events",
                            "Only independent events",
                            "All events",
                            "Only complementary events"
                        ],
                        correctIndex: 2,
                        explanation: "The general addition rule works for any events A and B."
                    },
                    {
                        question: "If P(A∪B) = 0.8, P(A) = 0.5, P(A∩B) = 0.1, what is P(B)?",
                        choices: ["0.3", "0.4", "0.2", "0.6"],
                        correctIndex: 1,
                        explanation: "Rearranging: P(B) = P(A∪B) - P(A) + P(A∩B) = 0.8 - 0.5 + 0.1 = 0.4"
                    },
                    {
                        question: "If events can't overlap, P(A and B) equals:",
                        choices: ["P(A)", "P(B)", "0", "1"],
                        correctIndex: 2,
                        explanation: "Non-overlapping (mutually exclusive) events have P(A and B) = 0."
                    }
                ]
            }
        ]
    },
    {
        id: 6,
        title: "Conditional Probability",
        spriteId: 7, // Squirtle (Water-type for conditional example)
        content: `
            <h3>Notation: P(B|A)</h3>
            <p>Probability of B happening <strong>GIVEN THAT</strong> A has already happened.</p>
            <div class="example-box">
                <p><strong>Pokemon Example:</strong></p>
                <p>You draw a card. You see it's a Water-type. What's the probability it knows Ice Beam?</p>
                <p>Sample space reduces from all cards to ONLY Water-type cards!</p>
            </div>
            <h3>Formula</h3>
            <p><strong>P(B|A) = P(A and B) / P(A)</strong></p>
        `,
        interactive: 'conditional-calc',
        quizzes: [
            {
                variant: 1,
                questions: [
                    {
                        question: "What does P(B|A) mean?",
                        choices: [
                            "P(B) divided by P(A)",
                            "Probability of B given A",
                            "P(A) times P(B)",
                            "Probability A causes B"
                        ],
                        correctIndex: 1,
                        explanation: "P(B|A) is read as 'probability of B given A' - the probability of B when we know A occurred."
                    },
                    {
                        question: "The formula for conditional probability is:",
                        choices: [
                            "P(B|A) = P(A) + P(B)",
                            "P(B|A) = P(A and B) / P(A)",
                            "P(B|A) = P(A) / P(B)",
                            "P(B|A) = P(A) × P(B)"
                        ],
                        correctIndex: 1,
                        explanation: "P(B|A) = P(A∩B) / P(A), where P(A) > 0"
                    },
                    {
                        question: "If P(Water) = 0.4, P(Water∩IceBeam) = 0.1, what is P(IceBeam|Water)?",
                        choices: ["0.5", "0.25", "0.4", "0.1"],
                        correctIndex: 1,
                        explanation: "P(IceBeam|Water) = 0.1 / 0.4 = 0.25"
                    }
                ]
            },
            {
                variant: 2,
                questions: [
                    {
                        question: "Conditional probability reduces the:",
                        choices: [
                            "Sample space",
                            "Probability to zero",
                            "Number of events",
                            "Formula complexity"
                        ],
                        correctIndex: 0,
                        explanation: "Given A occurred, we only consider outcomes where A happened - this reduces the sample space."
                    },
                    {
                        question: "If A and B are independent, P(B|A) equals:",
                        choices: ["0", "P(A)", "P(B)", "1"],
                        correctIndex: 2,
                        explanation: "For independent events, knowing A happened doesn't change the probability of B."
                    },
                    {
                        question: "If P(A|B) = 1, what does this mean?",
                        choices: [
                            "A and B are independent",
                            "B always happens when A happens",
                            "A always happens when B happens",
                            "A and B never happen together"
                        ],
                        correctIndex: 2,
                        explanation: "P(A|B) = 1 means whenever B occurs, A must also occur. B⊆A."
                    }
                ]
            },
            {
                variant: 3,
                questions: [
                    {
                        question: "When can we NOT calculate P(B|A)?",
                        choices: [
                            "When A and B are independent",
                            "When P(A) = 0",
                            "When P(B) = 0",
                            "When A and B are mutually exclusive"
                        ],
                        correctIndex: 1,
                        explanation: "We can't divide by zero, so P(B|A) is undefined when P(A) = 0."
                    },
                    {
                        question: "If P(A∩B) = 0.12 and P(B|A) = 0.4, what is P(A)?",
                        choices: ["0.3", "0.048", "0.4", "0.52"],
                        correctIndex: 0,
                        explanation: "Rearranging P(B|A) = P(A∩B)/P(A): P(A) = 0.12/0.4 = 0.3"
                    },
                    {
                        question: "Conditional probability is useful when:",
                        choices: [
                            "Events are completely independent",
                            "We have additional information about what happened",
                            "All outcomes are equally likely",
                            "We want to find the complement"
                        ],
                        correctIndex: 1,
                        explanation: "Conditional probability updates our probabilities based on new information."
                    }
                ]
            }
        ]
    },
    {
        id: 7,
        title: "Multiplication Rule",
        spriteId: 150, // Mewtwo (powerful, represents multiplication)
        content: `
            <h3>General Formula</h3>
            <p><strong>P(A and B) = P(A) × P(B|A)</strong></p>
            <h3>Independent Events</h3>
            <p>If A and B are independent, P(B|A) = P(B), so:</p>
            <p><strong>P(A and B) = P(A) × P(B)</strong></p>
            <div class="example-box">
                <p><strong>Example:</strong> Flipping Heads (1/2) AND rolling a 6 (1/6)</p>
                <p>P(Heads and 6) = 1/2 × 1/6 = 1/12</p>
            </div>
        `,
        interactive: 'tree-diagram',
        quizzes: [
            {
                variant: 1,
                questions: [
                    {
                        question: "The general multiplication rule is:",
                        choices: [
                            "P(A and B) = P(A) + P(B)",
                            "P(A and B) = P(A) × P(B|A)",
                            "P(A and B) = P(A) / P(B)",
                            "P(A and B) = P(A) - P(B)"
                        ],
                        correctIndex: 1,
                        explanation: "P(A∩B) = P(A) × P(B|A) for any events A and B."
                    },
                    {
                        question: "For independent events, P(A and B) equals:",
                        choices: [
                            "P(A) + P(B)",
                            "P(A) × P(B)",
                            "P(A) × P(B|A)",
                            "Both B and C"
                        ],
                        correctIndex: 3,
                        explanation: "For independent events, P(B|A) = P(B), so P(A∩B) = P(A) × P(B) = P(A) × P(B|A)"
                    },
                    {
                        question: "If P(A) = 0.6 and P(B|A) = 0.5, what is P(A∩B)?",
                        choices: ["1.1", "0.3", "0.5", "0.6"],
                        correctIndex: 1,
                        explanation: "P(A∩B) = 0.6 × 0.5 = 0.3"
                    }
                ]
            },
            {
                variant: 2,
                questions: [
                    {
                        question: "You flip a coin (P(H) = 0.5) then roll a die (P(6) = 1/6). What's P(Heads and 6)?",
                        choices: ["1/12", "1/6", "1/2", "2/3"],
                        correctIndex: 0,
                        explanation: "These are independent: P(H∩6) = 1/2 × 1/6 = 1/12"
                    },
                    {
                        question: "When using the multiplication rule for dependent events, we need:",
                        choices: [
                            "Only P(A) and P(B)",
                            "P(A) and P(B|A)",
                            "Only P(A∪B)",
                            "The sample space size"
                        ],
                        correctIndex: 1,
                        explanation: "For dependent events: P(A∩B) = P(A) × P(B|A)"
                    },
                    {
                        question: "If independent events each have P = 0.2, what's P(both occur)?",
                        choices: ["0.4", "0.04", "0.2", "0"],
                        correctIndex: 1,
                        explanation: "P(both) = 0.2 × 0.2 = 0.04"
                    }
                ]
            },
            {
                variant: 3,
                questions: [
                    {
                        question: "The multiplication rule helps us find:",
                        choices: [
                            "P(A or B)",
                            "P(A and B)",
                            "P(not A)",
                            "P(A) + P(B)"
                        ],
                        correctIndex: 1,
                        explanation: "The multiplication rule calculates the probability of both events occurring."
                    },
                    {
                        question: "Three independent events have P = 0.5 each. P(all three occur)?",
                        choices: ["1.5", "0.125", "0.5", "0.25"],
                        correctIndex: 1,
                        explanation: "P(all three) = 0.5 × 0.5 × 0.5 = 0.125"
                    },
                    {
                        question: "If P(A∩B) = 0.15 and P(A) = 0.3, what is P(B|A)?",
                        choices: ["0.5", "0.045", "0.15", "0.3"],
                        correctIndex: 0,
                        explanation: "Rearranging: P(B|A) = P(A∩B) / P(A) = 0.15 / 0.3 = 0.5"
                    }
                ]
            }
        ]
    },
    {
        id: 8,
        title: "Advanced Conditional Probability",
        spriteId: 9, // Blastoise (evolved form, represents advanced concepts)
        content: `
            <h3>Using Tables</h3>
            <p>Tables make it easy to see the reduced sample space.</p>
            <p><strong>P(Expert | Fire)</strong> = (Experts who like Fire) / (Total who like Fire)</p>
            <h3>Real World Example</h3>
            <p>In tournaments, knowing your opponent's team comp (Event A) changes the probability of them switching out (Event B).</p>
        `,
        interactive: 'table-viz',
        quizzes: [
            {
                variant: 1,
                questions: [
                    {
                        question: "In a probability table, to find P(A|B), you look at:",
                        choices: [
                            "The entire table",
                            "Only row or column where B occurs",
                            "Only where A occurs",
                            "The table diagonal"
                        ],
                        correctIndex: 1,
                        explanation: "Given B, we only consider the row/column where B is true, then find A within that subset."
                    },
                    {
                        question: "If 20 out of 50 Fire-types are Rare, what is P(Rare|Fire)?",
                        choices: ["20/50 = 0.4", "50/20 = 2.5", "20", "50"],
                        correctIndex: 0,
                        explanation: "P(Rare|Fire) = (Fire AND Rare) / (Fire) = 20/50 = 0.4"
                    },
                    {
                        question: "What does 'given' mean in probability?",
                        choices: [
                            "We're guessing",
                            "We know it already happened",
                            "It's impossible",
                            "It's certain"
                        ],
                        correctIndex: 1,
                        explanation: "'Given' means we have information that something has already occurred."
                    }
                ]
            },
            {
                variant: 2,
                questions: [
                    {
                        question: "In a table: 30 Beginners like Fire, 50 total like Fire. P(Beginner|Fire)?",
                        choices: ["30/50 = 0.6", "50/30", "30", "0.5"],
                        correctIndex: 0,
                        explanation: "P(Beginner|Fire) = (Beginner AND Fire) / (Total Fire) = 30/50 = 0.6"
                    },
                    {
                        question: "Why use tables for conditional probability?",
                        choices: [
                            "They look professional",
                            "Visualization makes finding subsets easier",
                            "Required by probability rules",
                            "They're always accurate"
                        ],
                        correctIndex: 1,
                        explanation: "Tables help visualize the reduced sample space and make calculations clearer."
                    },
                    {
                        question: "Conditional probability is especially useful for:",
                        choices: [
                            "Independent events only",
                            "Analyzing data with categories",
                            "Finding complements",
                            "Simple coin flips"
                        ],
                        correctIndex: 1,
                        explanation: "Tables with categorical data (like types, levels, etc.) are perfect for conditional probability."
                    }
                ]
            },
            {
                variant: 3,
                questions: [
                    {
                        question: "If P(A|B) ≠ P(A), what does this tell us?",
                        choices: [
                            "A and B are independent",
                            "A and B are dependent",
                            "A and B are mutually exclusive",
                            "A is impossible"
                        ],
                        correctIndex: 1,
                        explanation: "If knowing B changes the probability of A, they're dependent."
                    },
                    {
                        question: "In a 2×2 table, to find P(A|B), divide:",
                        choices: [
                            "Cell(A and B) by Total",
                            "Cell(A and B) by Row/Column total for B",
                            "Total by Cell(A and B)",
                            "Cell(A) by Cell(B)"
                        ],
                        correctIndex: 1,
                        explanation: "P(A|B) = Count(A and B) / Count(B total)"
                    },
                    {
                        question: "Advanced conditional probability helps in:",
                        choices: [
                            "Basic counting",
                            "Making decisions with partial information",
                            "Finding simple probabilities",
                            "Calculating complements"
                        ],
                        correctIndex: 1,
                        explanation: "Conditional probability is powerful for decision-making when we have incomplete information."
                    }
                ]
            }
        ]
    },
    {
        id: 9,
        title: "Bayes' Theorem",
        spriteId: 151, // Mew (legendary, represents advanced/powerful concept)
        content: `
            <h3>The Power of Reversing</h3>
            <p>Finds P(B|A) when we know P(A|B).</p>
            <h3>Formula</h3>
            <p class="formula">P(B|A) = [P(A|B) × P(B)] / P(A)</p>
            <div class="example-box">
                <p><strong>Medical Example:</strong></p>
                <p>A Pokemon tests positive for PokeRus. Is it actually sick?</p>
                <p>Bayes' Theorem helps us avoid the "False Positive Paradox".</p>
            </div>
        `,
        interactive: 'bayes-calc',
        quizzes: [
            {
                variant: 1,
                questions: [
                    {
                        question: "Bayes' Theorem allows us to:",
                        choices: [
                            "Find P(A and B)",
                            "Reverse conditional probabilities",
                            "Add probabilities",
                            "Find complements"
                        ],
                        correctIndex: 1,
                        explanation: "Bayes' Theorem lets us find P(B|A) from P(A|B), reversing the condition."
                    },
                    {
                        question: "The formula for Bayes' Theorem is:",
                        choices: [
                            "P(B|A) = P(A|B) + P(B)",
                            "P(B|A) = [P(A|B) × P(B)] / P(A)",
                            "P(B|A) = P(A) / P(B)",
                            "P(B|A) = P(A|B)"
                        ],
                        correctIndex: 1,
                        explanation: "P(B|A) = [P(A|B) × P(B)] / P(A), also written with denominator expanded."
                    },
                    {
                        question: "Bayes' Theorem is useful for:",
                        choices: [
                            "Simple probability calculations",
                            "Updating beliefs with new evidence",
                            "Finding sample spaces",
                            "Calculating means"
                        ],
                        correctIndex: 1,
                        explanation: "Bayes' Theorem helps update probabilities when we get new information or evidence."
                    }
                ]
            },
            {
                variant: 2,
                questions: [
                    {
                        question: "Why is Bayes' Theorem powerful?",
                        choices: [
                            "It's the simplest formula",
                            "It works backwards from effects to causes",
                            "It only needs one probability",
                            "It gives exact predictions"
                        ],
                        correctIndex: 1,
                        explanation: "Bayes lets us infer causes from effects - very useful in diagnosis, prediction, etc."
                    },
                    {
                        question: "In the PokeRus example, we want P(Sick|Positive). We need:",
                        choices: [
                            "Only P(Positive)",
                            "P(Positive|Sick), P(Sick), P(Positive)",
                            "Only P(Sick)",
                            "Just the test result"
                        ],
                        correctIndex: 1,
                        explanation: "Bayes requires P(Positive|Sick), P(Sick), and P(Positive) to find P(Sick|Positive)."
                    },
                    {
                        question: "The 'False Positive Paradox' occurs when:",
                        choices: [
                            "Tests are always wrong",
                            "Disease is rare, so positive tests are often false",
                            "Tests are 100% accurate",
                            "Everyone is sick"
                        ],
                        correctIndex: 1,
                        explanation: "When base rate P(sick) is very low, even accurate tests give many false positives."
                    }
                ]
            },
            {
                variant: 3,
                questions: [
                    {
                        question: "Bayes' Theorem connects P(A|B) and P(B|A) through:",
                        choices: [
                            "Addition",
                            "Multiplication and division using prior probabilities",
                            "Subtraction",
                            "Exponentiation"
                        ],
                        correctIndex: 1,
                        explanation: "Bayes uses multiplication rule and divides by the marginal probability."
                    },
                    {
                        question: "In Bayesian inference, P(B) is called:",
                        choices: [
                            "The posterior",
                            "The likelihood",
                            "The prior",
                            "The evidence"
                        ],
                        correctIndex: 2,
                        explanation: "P(B) is the prior probability - our belief before seeing evidence A."
                    },
                    {
                        question: "If P(A|B) = 0.9, P(B) = 0.01, P(A) = 0.1, what is P(B|A)?",
                        choices: ["0.09", "0.9", "0.01", "0.1"],
                        correctIndex: 0,
                        explanation: "P(B|A) = (0.9 × 0.01) / 0.1 = 0.009 / 0.1 = 0.09"
                    }
                ]
            }
        ]
    },
    {
        id: 10,
        title: "Review and Practice",
        spriteId: 131, // Lapras (friendly, represents completion)
        content: `
            <h3>You've Mastered the Rules!</h3>
            <ul>
                <li>Union (OR) and Intersection (AND)</li>
                <li>Independent vs Dependent</li>
                <li>Mutually Exclusive</li>
                <li>Conditional Probability & Bayes' Theorem</li>
            </ul>
            <p>Remember: Probability is just measuring uncertainty with numbers!</p>
            <h3>Final Challenge</h3>
            <p>Try the Ultimate Pokemon Tournament Challenge below!</p>
        `,
        interactive: 'final-quiz',
        quizzes: [
            {
                variant: 1,
                questions: [
                    {
                        question: "Which formula represents the addition rule for non-mutually exclusive events?",
                        choices: [
                            "P(A∪B) = P(A) + P(B)",
                            "P(A∪B) = P(A) + P(B) - P(A∩B)",
                            "P(A∪B) = P(A) × P(B)",
                            "P(A∪B) = P(A) / P(B)"
                        ],
                        correctIndex: 1,
                        explanation: "For any events: P(A∪B) = P(A) + P(B) - P(A∩B)"
                    },
                    {
                        question: "If P(A) = 0.6, what is P(A^C)?",
                        choices: ["0.6", "0.4", "-0.6", "Cannot determine"],
                        correctIndex: 1,
                        explanation: "Complement rule: P(A^C) = 1 - P(A) = 1 - 0.6 = 0.4"
                    },
                    {
                        question: "For independent events A and B, P(A∩B) = ?",
                        choices: [
                            "P(A) + P(B)",
                            "P(A) × P(B)",
                            "P(A) - P(B)",
                            "P(A) / P(B)"
                        ],
                        correctIndex: 1,
                        explanation: "Independence means P(A∩B) = P(A) × P(B)"
                    }
                ]
            },
            {
                variant: 2,
                questions: [
                    {
                        question: "Which best describes mutually exclusive events?",
                        choices: [
                            "They're independent",
                            "They can't both occur",
                            "They always occur together",
                            "They have equal probability"
                        ],
                        correctIndex: 1,
                        explanation: "Mutually exclusive events cannot happen simultaneously."
                    },
                    {
                        question: "P(B|A) = P(A∩B) / ?",
                        choices: ["P(B)", "P(A)", "P(A∪B)", "1"],
                        correctIndex: 1,
                        explanation: "Conditional probability: P(B|A) = P(A∩B) / P(A)"
                    },
                    {
                        question: "In Bayes' Theorem, if we know P(A|B), we can find:",
                        choices: ["P(A∪B)", "P(B|A)", "P(A^C)", "P(A) + P(B)"],
                        correctIndex: 1,
                        explanation: "Bayes' Theorem reverses conditions to find P(B|A) from P(A|B)."
                    }
                ]
            },
            {
                variant: 3,
                questions: [
                    {
                        question: "Comprehensive: P(A) = 0.5, P(B) = 0.4, P(A∩B) = 0.2. Are A and B independent?",
                        choices: [
                            "Yes, because P(A∩B) = P(A) × P(B)",
                            "No, because P(A∩B) ≠ P(A) × P(B)",
                            "Yes, because they overlap",
                            "Cannot determine"
                        ],
                        correctIndex: 0,
                        explanation: "Check: P(A) × P(B) = 0.5 × 0.4 = 0.2 = P(A∩B), so they ARE independent!"
                    },
                    {
                        question: "When does P(A|B) = P(A)?",
                        choices: [
                            "When A and B are mutually exclusive",
                            "When A and B are independent",
                            "When P(A) = 0",
                            "Never"
                        ],
                        correctIndex: 1,
                        explanation: "If A and B are independent, knowing B doesn't change P(A), so P(A|B) = P(A)."
                    },
                    {
                        question: "Which rule would you use: 'Probability of catching Fire OR Water type'?",
                        choices: [
                            "Multiplication rule",
                            "Addition rule",
                            "Bayes' Theorem",
                            "Complement rule"
                        ],
                        correctIndex: 1,
                        explanation: "'OR' signals union, so use the addition rule: P(Fire ∪ Water)"
                    }
                ]
            }
        ]
    }
];
