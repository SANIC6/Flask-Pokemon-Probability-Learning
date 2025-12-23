export const lessons = [
    {
        id: 1,
        title: "Introduction to Probability",
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
        interactive: 'coin-flip'
    },
    {
        id: 2,
        title: "Union, Intersection, and Complement",
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
        interactive: 'venn-diagram'
    },
    {
        id: 3,
        title: "Independence and Dependence",
        content: `
            <h3>Independent Events</h3>
            <p>One event doesn't change the probability of the other.</p>
            <p><em>Example: Flipping a coin twice. The coin doesn't remember the first flip!</em></p>
            
            <h3>Dependent Events</h3>
            <p>The first event changes the probability of the second.</p>
            <p><em>Example: Drawing a card and NOT putting it back. The deck is smaller now!</em></p>
        `,
        interactive: 'card-draw'
    },
    {
        id: 4,
        title: "Mutually Exclusive Events",
        content: `
            <h3>What Are They?</h3>
            <p>Two events that cannot happen at the same time.</p>
            <div class="example-box">
                <p><strong>Starter Selection:</strong> You can choose Bulbasaur OR Charmander, but not both!</p>
            </div>
            <h3>Addition Rule</h3>
            <p>For mutually exclusive events: <strong>P(A or B) = P(A) + P(B)</strong></p>
        `,
        interactive: 'starter-choice'
    },
    {
        id: 5,
        title: "The Addition Rule",
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
        interactive: 'addition-calc'
    },
    {
        id: 6,
        title: "Conditional Probability",
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
        interactive: 'conditional-calc'
    },
    {
        id: 7,
        title: "Multiplication Rule",
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
        interactive: 'tree-diagram'
    },
    {
        id: 8,
        title: "Advanced Conditional Probability",
        content: `
            <h3>Using Tables</h3>
            <p>Tables make it easy to see the reduced sample space.</p>
            <p><strong>P(Expert | Fire)</strong> = (Experts who like Fire) / (Total who like Fire)</p>
            <h3>Real World Example</h3>
            <p>In tournaments, knowing your opponent's team comp (Event A) changes the probability of them switching out (Event B).</p>
        `,
        interactive: 'table-viz'
    },
    {
        id: 9,
        title: "Bayes' Theorem",
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
        interactive: 'bayes-calc'
    },
    {
        id: 10,
        title: "Review and Practice",
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
        interactive: 'final-quiz'
    }
];
