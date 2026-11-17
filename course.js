// Details for every course, stored in one object.
// The key (piano, guitar...) matches the ?course= part of the link on each card.
const courses = {
    piano: {
        name: "Piano",
        tagline: "From your first notes to your favourite songs.",
        image: "images/Piano.png",
        duration: "3 Months",
        fee: "Ksh 3,000 per month",
        description: "Our piano course teaches you to read music and play with both hands. Lessons mix technique, theory and pieces you enjoy, so you make steady progress every week.",
        learn: ["Reading notes on the treble and bass clef", "Major and minor scales", "Chords and simple accompaniment", "Playing pieces with both hands"],
        who: "Complete beginners and learners who want to build on what they already know."
    },
    guitar: {
        name: "Guitar",
        tagline: "Chords, strumming and confidence.",
        image: "images/Guitar.jpg",
        duration: "3 Months",
        fee: "Ksh 2,500 per month",
        description: "Learn acoustic guitar step by step, starting with comfortable hand positions and moving on to full songs you can play and sing along to.",
        learn: ["Open chords and chord changes", "Strumming patterns", "Simple fingerpicking", "Playing complete songs"],
        who: "Beginners of all ages. Bring your own guitar or use one of ours in class."
    },
    violin: {
        name: "Violin",
        tagline: "A beautiful tone, one bow at a time.",
        image: "images/Logo.jpg",
        duration: "3 Months",
        fee: "Ksh 5,000 per month",
        description: "Our violin course builds good habits from the very first lesson: posture, bowing and listening carefully to your own sound.",
        learn: ["Holding the violin and bow correctly", "Bowing and tone production", "Playing in tune", "Reading violin music"],
        who: "Beginners, and learners preparing to join an orchestra or ensemble."
    },
    drums: {
        name: "Drums",
        tagline: "Keep the beat and drive the band.",
        image: "images/Drums.png",
        duration: "3 Months",
        fee: "Ksh 3,000 per month",
        description: "Develop rhythm, timing and coordination on a full drum kit, and learn the grooves used in gospel, pop and Afro-beat music.",
        learn: ["Basic rock and gospel grooves", "Playing in time with a metronome", "Simple fills", "Reading drum notation"],
        who: "Anyone with a love of rhythm. No experience needed."
    },
    vocal: {
        name: "Vocal Training",
        tagline: "Find and grow your voice.",
        image: "images/Singing.png",
        duration: "2 Months",
        fee: "Ksh 1,500 per month",
        description: "Healthy singing starts with good breathing. This course strengthens your voice and builds your confidence to perform in front of others.",
        learn: ["Breathing and breath support", "Singing in tune", "Warm-ups that protect your voice", "Singing harmonies and performing"],
        who: "Choir members, worship team singers and anyone who loves to sing."
    },
    theory: {
        name: "Music Theory",
        tagline: "Understand how music works.",
        image: "images/Musictheory.png",
        duration: "2 Months",
        fee: "Ksh 2,000 per month",
        description: "Music theory explains why music sounds the way it does. Understanding it makes learning any instrument faster and easier.",
        learn: ["Notes, rhythm and time signatures", "Scales and key signatures", "Intervals and chords", "Writing a short melody"],
        who: "Every music student, especially those preparing for graded exams."
    }
};

// 1. Read which course was chosen from the link, e.g. course.html?course=piano
const params = new URLSearchParams(window.location.search);
const key = params.get("course");
const course = courses[key];

// 2. Fill in the page, or show a message if the course doesn't exist
if (course) {
    document.title = course.name + " | Harmony Music Academy";
    document.getElementById("courseHero").style.backgroundImage = "url('" + course.image + "')";
    document.getElementById("courseTitle").textContent = course.name;
    document.getElementById("courseTagline").textContent = course.tagline;
    document.getElementById("courseDescription").textContent = course.description;
    document.getElementById("courseWho").textContent = course.who;
    document.getElementById("courseDuration").textContent = course.duration;
    document.getElementById("courseFee").textContent = course.fee;

    // Build the "What you will learn" list, one <li> per item
    const list = document.getElementById("courseLearn");
    course.learn.forEach(function(item) {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });

    // The enrol button takes the course name back to the form
    document.getElementById("enrolButton").href =
        "index.html?course=" + encodeURIComponent(course.name) + "#register";
} else {
    document.getElementById("courseTitle").textContent = "Course not found";
    document.getElementById("courseDescription").textContent =
        "Please go back and choose a course from our programmes.";
}
