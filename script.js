// ========== 5. JAVASCRIPT INTERACTIVITY ==========

// ---------- Welcome button ----------
function showWelcome() {
    alert("Welcome to Harmony Music Academy!");
    document.getElementById("programmes").scrollIntoView({ behavior: "smooth" });
}

// Show the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Choosing a course ----------
// Pre-select a course in the form
function selectCourse(courseName) {
    document.getElementById("course").value = courseName;
}

// Used by the "Select" buttons in the fees table:
// choose the course, then scroll down to the form
function chooseCourse(courseName) {
    selectCourse(courseName);
    document.getElementById("register").scrollIntoView({ behavior: "smooth" });
}

// If we arrived from course.html, e.g. index.html?course=Drums#register
const params = new URLSearchParams(window.location.search);
const chosenCourse = params.get("course");
if (chosenCourse) {
    selectCourse(chosenCourse);
}

// ---------- Work out the "Total Fee" column ----------
// For each row: total = months × fee per month
document.querySelectorAll("#feesTable tbody tr").forEach(function (row) {
    const months = Number(row.cells[1].textContent);
    const fee = Number(row.cells[2].textContent.replace(",", ""));
    const total = months * fee;
    row.querySelector(".total").textContent = total.toLocaleString("en-KE");
});

// ---------- Form validation ----------
const form = document.getElementById("registrationForm");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    // Get form values
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const course = document.getElementById("course").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const terms = document.getElementById("terms").checked;
    const message = document.getElementById("formMessage");

    // Clear previous errors
    document.querySelectorAll(".error").forEach(function (error) {
        error.textContent = "";
    });
    message.textContent = "";

    let valid = true;

    // Validate name
    if (name.length < 2) {
        document.getElementById("nameError").textContent = "Please enter your full name.";
        valid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        valid = false;
    }

    // Validate phone number (Kenyan format)
    const phonePattern = /^(?:\+254|0)\d{9}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").textContent = "Enter a valid Kenyan number, e.g. 0701234567.";
        valid = false;
    }

    // Validate course
    if (course === "") {
        document.getElementById("courseError").textContent = "Please select a course.";
        valid = false;
    }

    // Validate gender
    if (!gender) {
        document.getElementById("genderError").textContent = "Please select your gender.";
        valid = false;
    }

    // Validate terms and conditions
    if (!terms) {
        document.getElementById("termsError").textContent = "You must accept the school rules.";
        valid = false;
    }

    // Stop if any validation fails
    if (!valid) {
        message.style.color = "#c0392b";
        message.textContent = "Please correct the errors above.";
        return;
    }

    // Clear the form first, then show the success message
    form.reset();
    message.style.color = "green";
    message.textContent = "Your form has been submitted successfully! Thank you, " +
        name + ". Your selected course is " + course + ".";
    alert("Registration successful! Thank you, " + name + ".");
});

// Clear messages when the Clear Form button is clicked
form.addEventListener("reset", function () {
    document.querySelectorAll(".error").forEach(function (error) {
        error.textContent = "";
    });
    document.getElementById("formMessage").textContent = "";
});

// ---------- Fade-in sections on scroll ----------
const fadeSections = document.querySelectorAll(".section");

fadeSections.forEach(function (section) {
    section.classList.add("fade-in");
});

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

fadeSections.forEach(function (section) {
    observer.observe(section);
});

// ---------- Animated wave background for the hero ----------
// Animated hero background (WebGL shader) - generated with an online design tool
// and adapted for this site (colours changed to match the wine and rose-gold theme)
(function () {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;

    function syncSize() {
        const w = canvas.clientWidth || 1280;
        const h = canvas.clientHeight || 720;
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }
    }
    if (typeof ResizeObserver !== "undefined") {
        new ResizeObserver(syncSize).observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const vs = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    vec2 mouse = (u_mouse - 0.5 * u_resolution) / u_resolution.y;
    float distMouse = length(uv - mouse);
    float t = u_time * 0.35;

    float wave1 = sin(uv.x * 3.8 + t * 1.2 + sin(uv.y * 2.2 + t * 0.7)) * 0.16;
    float wave2 = cos(uv.x * 5.2 - t * 0.9 + cos(uv.y * 3.5 - t * 0.5)) * 0.12;
    float wave3 = sin(uv.x * 8.0 + t * 1.8 + uv.y * 4.0) * 0.08;
    float composite = wave1 + wave2 + wave3;

    float harmonic1 = smoothstep(0.18, 0.0, abs(uv.y - composite * 1.2 - 0.08));
    float harmonic2 = smoothstep(0.15, 0.0, abs(uv.y - composite * 0.8 + 0.1));
    float harmonic3 = smoothstep(0.22, 0.0, abs(uv.y - composite * 1.5 + 0.02));

    // Wine and rose-gold colours (each number = colour value / 255)
    vec3 baseColor  = vec3(0.165, 0.047, 0.090); // #2a0c17
    vec3 midWine    = vec3(0.290, 0.082, 0.149); // #4a1526
    vec3 roseGold   = vec3(0.831, 0.592, 0.494); // #d4977e
    vec3 roseLight  = vec3(0.910, 0.702, 0.612); // #e8b39c

    float radial = length(uv * vec2(0.8, 1.2));
    vec3 col = mix(midWine, baseColor, smoothstep(0.1, 0.9, radial));

    col += roseGold * (harmonic1 * 0.55);
    col += roseLight * (harmonic2 * 0.40);
    col += vec3(0.75, 0.50, 0.42) * (harmonic3 * 0.35);

    float dust = sin(uv.x * 45.0 + t * 2.0) * cos(uv.y * 45.0 - t * 1.5);
    dust = pow(max(0.0, dust), 12.0) * 0.25;
    col += roseLight * dust;

    col += roseGold * (exp(-distMouse * 4.0) * 0.2);

    gl_FragColor = vec4(col, 1.0);
}`;

    function compile(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    window.addEventListener("mousemove", function (event) {
        const rect = canvas.getBoundingClientRect();
        if (rect.width && rect.height) {
            mouse.x = ((event.clientX - rect.left) / rect.width) * canvas.width;
            mouse.y = (1.0 - (event.clientY - rect.top) / rect.height) * canvas.height;
        }
    });

    function render(t) {
        if (typeof ResizeObserver === "undefined") syncSize();
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform1f(uTime, t * 0.001);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(render);
    }
    render(0);
})();
