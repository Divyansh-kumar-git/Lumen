// Curated skill models for LUMEN.
// The React + Vite edition keeps the roadmap engine offline and hackathon-safe.

export const GOALS = [
      {
        key: "web", label: "Build websites", hint: "HTML, CSS & JavaScript", icon: "WEB",
        name: "web development", outcome: "publish a small responsive web page",
        milestones: [
          { title: "Map the web", topic: "how HTML, CSS and JavaScript work together", practice: "sketch one simple profile page with a heading, image and button", checkpoint: "You can name what each of the three languages controls.", why: "A tiny mental model prevents tutorial overload." },
          { title: "Shape a page", topic: "HTML structure and semantic tags", practice: "write the page heading, two sections and one call-to-action", checkpoint: "Your page makes sense with CSS switched off.", why: "Structure first means every later style has a clear home." },
          { title: "Style with confidence", topic: "CSS layout with flexbox and spacing", practice: "add a readable layout, one accent color and mobile-friendly spacing", checkpoint: "Your page stays usable on a narrow screen.", why: "Visual progress builds motivation immediately." },
          { title: "Add one interaction", topic: "simple JavaScript events and state", practice: "make the button reveal a short success message", checkpoint: "A real click changes something on the page.", why: "One interaction teaches cause and effect without a huge app." },
          { title: "Build your first win", topic: "turning a tutorial into your own mini project", practice: "replace the sample text with your own story and improve one detail", checkpoint: "The page feels like yours, not a copied exercise.", why: "Personal projects turn information into usable skill." },
          { title: "Share and reflect", topic: "publishing a basic page and explaining your choices", practice: "share a screenshot or link and write three things you learned", checkpoint: "You can explain your first project in under a minute.", why: "Explaining the work closes the learning loop." }
        ]
      },
      {
        key: "data", label: "Analyze data", hint: "Find a story in numbers", icon: "DATA",
        name: "data analysis", outcome: "turn a small dataset into one clear insight",
        milestones: [
          { title: "Frame one question", topic: "how to turn curiosity into an answerable data question", practice: "write one question about a topic you care about", checkpoint: "Your question has a clear subject and measurable comparison.", why: "A focused question stops endless spreadsheet wandering." },
          { title: "Meet your dataset", topic: "rows, columns, data types and missing values", practice: "download or copy a small 20-row dataset and label each column", checkpoint: "You know what one row represents.", why: "Understanding the unit of data prevents wrong conclusions." },
          { title: "Clean the noise", topic: "fixing blanks, duplicates and inconsistent labels", practice: "clean at least three messy cells and document what changed", checkpoint: "Someone else can trust your cleaned sheet.", why: "Simple cleaning builds trust in every result that follows." },
          { title: "Make one chart", topic: "choosing a chart that matches your question", practice: "create one chart and write a one-sentence caption", checkpoint: "The chart title states the insight, not just the columns.", why: "A visual makes patterns obvious to you and your audience." },
          { title: "Explain the insight", topic: "separating observation, interpretation and action", practice: "write one observation, one likely reason and one next step", checkpoint: "You do not claim more than the data supports.", why: "Clear thinking matters more than complex formulas at the start." },
          { title: "Publish a mini report", topic: "sharing a simple data story", practice: "combine your chart and three short findings into one page", checkpoint: "A busy person can understand your conclusion in 30 seconds.", why: "A shareable result proves the skill is real." }
        ]
      },
      {
        key: "speaking", label: "Speak confidently", hint: "Tell a clear story", icon: "TALK",
        name: "public speaking", outcome: "deliver a clear two-minute talk",
        milestones: [
          { title: "Choose one message", topic: "finding the single point your audience should remember", practice: "finish the sentence: ‘By the end, my audience will understand…’", checkpoint: "Your message fits in one short sentence.", why: "Clarity starts before slides or performance tricks." },
          { title: "Build three beats", topic: "a simple opening, middle and close", practice: "write one hook, one example and one closing line", checkpoint: "Your talk has a beginning, a point and a finish.", why: "A three-beat structure is easy to remember under pressure." },
          { title: "Rehearse out loud", topic: "turning written notes into spoken language", practice: "say the talk twice to a timer without rewriting it", checkpoint: "You can finish without reading every word.", why: "Speaking is a physical skill; the mouth needs practice too." },
          { title: "Tune your delivery", topic: "pace, pauses and eye contact", practice: "record one take and mark one place to pause", checkpoint: "Your key message is easier to hear than before.", why: "Small delivery changes create a big confidence lift." },
          { title: "Get safe feedback", topic: "asking for one specific improvement", practice: "share your recording with one trusted person and ask one question", checkpoint: "You have one actionable note, not vague criticism.", why: "Focused feedback keeps improvement manageable." },
          { title: "Give the real talk", topic: "delivering your message to a real listener", practice: "present your two-minute talk and note what felt easier", checkpoint: "You finished and named one thing to improve next time.", why: "The first real delivery turns practice into confidence." }
        ]
      },
      {
        key: "design", label: "Design UI/UX", hint: "Create useful screens", icon: "UX",
        name: "UI/UX design", outcome: "prototype a simple user-friendly screen",
        milestones: [
          { title: "Understand the user", topic: "writing a simple user goal and pain point", practice: "describe one person, their goal and one frustration", checkpoint: "Your design problem is about a person, not a feature list.", why: "Good design starts with a clear human need." },
          { title: "Sketch the flow", topic: "turning a goal into three to four screens", practice: "draw the smallest route from entry to success", checkpoint: "Each screen has one obvious purpose.", why: "A simple flow prevents beautiful but confusing interfaces." },
          { title: "Wireframe one screen", topic: "hierarchy, spacing and calls to action", practice: "make a grayscale layout with one primary action", checkpoint: "The most important element is obvious in five seconds.", why: "Hierarchy is the fastest usability upgrade." },
          { title: "Add a visual system", topic: "color, type and consistent components", practice: "choose two colors, two font sizes and one button style", checkpoint: "Your choices are consistent across the screen.", why: "Constraints make design calmer and more accessible." },
          { title: "Prototype the click", topic: "connecting screens into a testable interaction", practice: "link your primary button to the success state", checkpoint: "Someone can click through without your explanation.", why: "An interactive prototype exposes confusion early." },
          { title: "Test and improve", topic: "running a five-minute usability test", practice: "watch one person use it and change one confusing detail", checkpoint: "You can name the problem you fixed and why.", why: "Feedback turns guesses into evidence." }
        ]
      },
      {
        key: "python", label: "Learn Python", hint: "Automate a small task", icon: "PY",
        name: "Python", outcome: "write a small script that solves a real problem",
        milestones: [
          { title: "Set up your lab", topic: "where Python code runs and how to print output", practice: "run a script that prints your name and one goal", checkpoint: "You can edit, run and rerun a file confidently.", why: "A reliable setup removes the first technical roadblock." },
          { title: "Speak in variables", topic: "variables, strings, numbers and basic input", practice: "store three facts about your day and print a sentence", checkpoint: "You can predict what each print statement shows.", why: "Variables are the vocabulary of every program." },
          { title: "Make decisions", topic: "conditionals and comparisons", practice: "write a tiny chooser that gives different advice by time of day", checkpoint: "Different inputs reliably produce different outputs.", why: "Logic makes your script feel useful, not static." },
          { title: "Repeat with loops", topic: "processing a list without copying code", practice: "turn a five-item list into five formatted lines", checkpoint: "Adding a sixth item needs no new code.", why: "Loops reveal the leverage of programming." },
          { title: "Build a mini tool", topic: "combining inputs, logic and output", practice: "create a small calculator, habit checker or file renamer", checkpoint: "The tool solves one real annoyance for you.", why: "A personal use case makes the learning stick." },
          { title: "Explain your script", topic: "comments, naming and simple debugging", practice: "add three helpful comments and fix one broken test case", checkpoint: "A friend can understand the script’s purpose.", why: "Readable code is the bridge from beginner to collaborator." }
        ]
      },
      {
        key: "marketing", label: "Market online", hint: "Reach the right people", icon: "MKT",
        name: "digital marketing", outcome: "launch one focused campaign experiment",
        milestones: [
          { title: "Pick one audience", topic: "defining a specific audience and problem", practice: "write one sentence describing who you help and what they need", checkpoint: "Your audience is narrower than ‘everyone’.", why: "Specificity makes every later message stronger." },
          { title: "Shape the promise", topic: "turning features into one clear benefit", practice: "write three headlines, then keep the clearest one", checkpoint: "A stranger can tell why they should care.", why: "A clear promise is more useful than clever wording." },
          { title: "Choose one channel", topic: "matching audience behavior to a marketing channel", practice: "pick one channel and list three places your audience already spends time", checkpoint: "Your channel choice has a reason, not a trend.", why: "Focus beats being lightly present everywhere." },
          { title: "Create one asset", topic: "making a useful post, email or landing section", practice: "publish one asset with a single call to action", checkpoint: "The next step is unmistakable.", why: "One real asset teaches more than a month of theory." },
          { title: "Measure one signal", topic: "choosing a simple metric that matches your goal", practice: "track clicks, replies or signups for seven days", checkpoint: "Your metric directly relates to your action.", why: "Simple measurement prevents vanity-metric confusion." },
          { title: "Improve the loop", topic: "reading results and changing one variable", practice: "rewrite the headline or call to action based on what happened", checkpoint: "You can explain what you changed and what you learned.", why: "Marketing becomes learnable when it becomes a loop." }
        ]
      },
      {
        key: "guitar", label: "Play guitar", hint: "Play your first song", icon: "GTR",
        name: "guitar", outcome: "play a simple song with steady rhythm",
        milestones: [
          { title: "Know your instrument", topic: "tuning, posture and the parts of the guitar", practice: "tune the guitar and play each open string slowly", checkpoint: "Every string sounds in tune before practice.", why: "A tuned instrument makes progress sound rewarding." },
          { title: "Learn two chords", topic: "clean fretting for two beginner chords", practice: "play each chord five times and fix buzzing strings", checkpoint: "Both chords ring clearly at least three times in a row.", why: "Two clean chords unlock dozens of songs." },
          { title: "Switch smoothly", topic: "moving between chords without stopping", practice: "use a one-minute timer and count clean switches", checkpoint: "Your beat does not completely stop during a switch.", why: "Chord changes are the real first milestone." },
          { title: "Add a rhythm", topic: "simple down-strums and counting", practice: "strum four beats per chord while counting out loud", checkpoint: "Your hand keeps time even when a chord is imperfect.", why: "Rhythm makes simple chords feel like music." },
          { title: "Play a first song", topic: "putting chords, rhythm and structure together", practice: "play a two-chord version of a song from start to finish", checkpoint: "You finish without restarting after a mistake.", why: "Finishing builds more confidence than perfection." },
          { title: "Record and repeat", topic: "listening for one improvement", practice: "record one take and choose the next small fix", checkpoint: "You know exactly what to practice tomorrow.", why: "Feedback closes the loop and makes practice purposeful." }
        ]
      },
      {
        key: "photo", label: "Take better photos", hint: "Compose with light", icon: "PH",
        name: "photography", outcome: "create a small set of intentional photos",
        milestones: [
          { title: "Notice the light", topic: "direction, softness and timing of natural light", practice: "photograph one object near a window at two different times", checkpoint: "You can describe which light made the subject clearer.", why: "Light is the fastest photography upgrade." },
          { title: "Frame with intent", topic: "rule of thirds, background and negative space", practice: "take three versions of one subject from different angles", checkpoint: "Your subject has a clear place in the frame.", why: "Intentional framing removes visual clutter." },
          { title: "Control the focus", topic: "choosing what the viewer notices first", practice: "make one portrait or object photo with a clean background", checkpoint: "The important detail is sharp and easy to find.", why: "Focus guides attention like a visual headline." },
          { title: "Edit with restraint", topic: "cropping, exposure and natural color", practice: "edit one photo using only three adjustments", checkpoint: "The photo still looks natural and more intentional.", why: "Small edits teach taste without hiding mistakes." },
          { title: "Make a mini series", topic: "creating three photos that feel connected", practice: "shoot three images around one theme", checkpoint: "The set shares a clear subject, color or mood.", why: "A series turns isolated shots into a project." },
          { title: "Share and learn", topic: "asking for specific photo feedback", practice: "post your strongest image and ask which detail draws the eye", checkpoint: "You have one idea for the next shoot.", why: " feedback turns practice into deliberate improvement." }
        ]
      },
      {
        key: "custom", label: "Something else", hint: "Type any skill", icon: "★",
        name: "your chosen skill", outcome: "complete a small, shareable first project",
        milestones: []
      }
    ];

export const CUSTOM_MILESTONES = [
      { title: "Find your starting line", topic: "what a confident beginner should understand first about your skill", practice: "write what you already know, what confuses you and what ‘good’ looks like", checkpoint: "Your starting point and destination are both written down.", why: "Orientation removes the fear of the unknown." },
      { title: "Learn the core pattern", topic: "the one foundational idea that appears everywhere in your skill", practice: "study one beginner example and copy it slowly", checkpoint: "You can explain the core pattern in plain language.", why: "One pattern gives every future lesson a place to stick." },
      { title: "Practice deliberately", topic: "turning passive exposure into an active repetition", practice: "complete a tiny exercise and note one mistake without judging it", checkpoint: "You can repeat the exercise with fewer prompts.", why: "Focused repetition is where real skill starts." },
      { title: "Make a small project", topic: "combining the basics into one personal result", practice: "create the smallest version that still feels meaningfully yours", checkpoint: "You have an artifact, not just notes.", why: "A project reveals gaps more honestly than a quiz." },
      { title: "Get one useful critique", topic: "asking for feedback that leads to action", practice: "share your work with one person and ask for one improvement", checkpoint: "You have a specific next fix, not vague praise.", why: "Outside perspective accelerates progress." },
      { title: "Show your first win", topic: "reflecting and choosing the next horizon", practice: "write what got easier, what remains hard and one next question", checkpoint: "You can name a confident next step without starting over.", why: "Reflection turns a first win into a repeatable path." }
    ];

export const LEVELS = {
      beginner: { label: "Complete beginner", intro: "Start gently", adapter: "Start with a 5-minute learning log and one no-pressure warm-up." },
      some: { label: "I know a little", intro: "Skip the obvious", adapter: "Begin with a quick calibration task so you do not repeat what you already know." },
      returning: { label: "I’m restarting", intro: "Rebuild confidence", adapter: "Begin with a low-stakes warm-up that reactivates what you remember." }
    };

export const TIME_MODES = {
      "15": { label: "15 minutes / day", short: "15 min", duration: "10–15 min", sessions: "12 short sessions", note: "micro-sessions" },
      "30": { label: "30 minutes / day", short: "30 min", duration: "20–30 min", sessions: "10 focused sessions", note: "steady daily rhythm" },
      "60": { label: "1 hour / day", short: "60 min", duration: "45–60 min", sessions: "7 deeper sessions", note: "faster immersive pace" },
      "weekend": { label: "Weekend blocks", short: "weekend", duration: "75–90 min", sessions: "6 weekend blocks", note: "weekend deep-work plan" }
    };

export const STYLE_MODES = {
      watch: { label: "Watch-first", short: "Video", learn: topic => `Watch one short beginner video about ${topic}.`, practice: milestone => `Pause and copy along: ${milestone.practice}.`, reflect: checkpoint => `Record a 20-second voice note: ${checkpoint}` },
      read: { label: "Read-first", short: "Guide", learn: topic => `Skim one clear guide about ${topic}; save only the headings.`, practice: milestone => `Follow one worked example, then try it yourself: ${milestone.practice}.`, reflect: checkpoint => `Close the guide and explain from memory: ${checkpoint}` },
      do: { label: "Hands-on", short: "Practice", learn: topic => `Try a small interactive exercise about ${topic} before reading theory.`, practice: milestone => `Build by trial and error: ${milestone.practice}.`, reflect: checkpoint => `Write one confusion and one fix: ${checkpoint}` },
      listen: { label: "Listen-first", short: "Audio", learn: topic => `Listen to one short explainer about ${topic} while taking three keywords.`, practice: milestone => `Repeat the idea out loud, then do this: ${milestone.practice}.`, reflect: checkpoint => `Give a 30-second spoken summary: ${checkpoint}` }
    };

export const BADGES = [
      { id: "spark", label: "First Spark", hint: "Complete one action", test: s => s.actions >= 1 },
      { id: "quest", label: "Quest Keeper", hint: "Finish today’s 2-action quest", test: s => s.dailyQuestComplete },
      { id: "arcade", label: "Arcade Spark", hint: "Play one reward game", test: s => s.gamePlays >= 1 },
      { id: "pathfinder", label: "Pathfinder", hint: "Complete one step", test: s => s.steps >= 1 },
      { id: "halfway", label: "Halfway Star", hint: "Complete three steps", test: s => s.steps >= 3 },
      { id: "streak3", label: "3-Day Orbit", hint: "Return for three days", test: s => s.streak >= 3 },
      { id: "finisher", label: "Path Finisher", hint: "Complete the whole path", test: s => s.allComplete }
    ];
