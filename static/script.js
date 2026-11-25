
// =================================
// CAREERMATCH - JAVASCRIPT
// =================================

// 1. Job Data
const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Northstar Digital",
        location: "Remote",
        type: "Full-time",
        level: "Entry-level",
        category: "Technology",
        salary: "PKR 80k-120k",
        source: "Indeed",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        desc: "Build responsive websites and user interfaces."
    },
    {
        id: 2,
        title: "Python Developer Intern",
        company: "CodeCrafters",
        location: "Islamabad, Pakistan",
        type: "Internship",
        level: "Internship",
        category: "Technology",
        salary: "Paid Internship",
        source: "LinkedIn",
        skills: ["Python", "Flask", "SQL"],
        desc: "Work with Python and backend development."
    },
    {
        id: 3,
        title: "Data Analyst",
        company: "BrightPath Analytics",
        location: "Remote",
        type: "Full-time",
        level: "Entry-level",
        category: "Data & Analytics",
        salary: "PKR 90k-140k",
        source: "Indeed",
        skills: ["SQL", "Python", "Excel", "Power BI"],
        desc: "Analyze data and create useful reports."
    },
    {
        id: 4,
        title: "UI UX Designer",
        company: "Pixel & Form",
        location: "Lahore, Pakistan",
        type: "Hybrid",
        level: "Mid-level",
        category: "Design",
        salary: "PKR 100k-160k",
        source: "LinkedIn",
        skills: ["Figma", "Wireframing", "Prototyping"],
        desc: "Design modern user-friendly interfaces."
    },
    {
        id: 5,
        title: "Machine Learning Intern",
        company: "NeuralWorks",
        location: "Islamabad, Pakistan",
        type: "Internship",
        level: "Internship",
        category: "Data & Analytics",
        salary: "Not disclosed",
        source: "LinkedIn",
        skills: ["Python", "Machine Learning", "Pandas"],
        desc: "Work on machine learning projects."
    },
    {
        id: 6,
        title: "Backend Developer",
        company: "CloudNest",
        location: "Remote",
        type: "Full-time",
        level: "Mid-level",
        category: "Technology",
        salary: "PKR 150k-220k",
        source: "Indeed",
        skills: ["Node.js", "MongoDB", "Express"],
        desc: "Develop backend applications and APIs."
    }
];

// 2. Select HTML Elements
const get = (id) => document.getElementById(id);

let savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
let activeType = "all";

// 3. Toast Message
function showMessage(message) {
    const toast = get("toast");

    if (!toast) {
        alert(message);
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// 4. Page Navigation
function showPage(page) {

    document.querySelectorAll(".page").forEach(section => {
        section.classList.remove("active");
    });

    const selectedPage = get(page + "Page");

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.page === page
        );
    });

    window.scrollTo(0, 0);

    if (page === "jobs") {
        displayJobs();
    }
}

// Navigation Buttons
document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        showPage(this.dataset.page);

    });

});

// 5. Mobile Menu
const menuBtn = get("menuBtn");

if (menuBtn) {
    menuBtn.addEventListener("click", function() {
        document.querySelector("nav").classList.toggle("open");
    });
}

// 6. Job Search
function searchJobs(keyword, location) {

    if (get("jobsKeyword")) {
        get("jobsKeyword").value = keyword;
    }

    if (get("jobsLocation")) {
        get("jobsLocation").value = location;
    }

    showPage("jobs");

    displayJobs();
}

// Homepage Search
if (get("homeSearch")) {

    get("homeSearch").addEventListener("submit", function(event) {

        event.preventDefault();

        searchJobs(
            get("homeKeyword").value,
            get("homeLocation").value
        );

    });

}

// Jobs Page Search
if (get("jobsSearch")) {

    get("jobsSearch").addEventListener("submit", function(event) {

        event.preventDefault();

        displayJobs();

    });

}

// Popular Searches
document.querySelectorAll("[data-search]").forEach(button => {

    button.addEventListener("click", function() {

        searchJobs(this.dataset.search, "");

    });

});

// 7. Display Jobs
function displayJobs() {

    const keyword = get("jobsKeyword")?.value.toLowerCase() || "";
    const location = get("jobsLocation")?.value.toLowerCase() || "";

    const experience = get("experienceFilter")?.value || "";
    const workType = get("typeFilter")?.value || "";
    const category = get("categoryFilter")?.value || "";

    let filteredJobs = jobs.filter(job => {

        const searchableText = (
            job.title + " " +
            job.company + " " +
            job.category + " " +
            job.skills.join(" ")
        ).toLowerCase();

        const matchKeyword = !keyword ||
            searchableText.includes(keyword);

        const matchLocation = !location ||
            job.location.toLowerCase().includes(location);

        const matchExperience = !experience ||
            job.level === experience;

        const matchType = !workType ||
            job.type === workType ||
            job.location === workType;

        const matchCategory = !category ||
            job.category === category;

        const matchFilter = activeType === "all" ||
            job.type === activeType ||
            job.level === activeType ||
            job.location === activeType;

        return matchKeyword &&
            matchLocation &&
            matchExperience &&
            matchType &&
            matchCategory &&
            matchFilter;

    });

    // Sorting
    if (get("sortJobs")?.value === "az") {

        filteredJobs.sort((a, b) =>
            a.company.localeCompare(b.company)
        );

    }

    const jobList = get("jobList");

    if (!jobList) return;

    if (get("resultCount")) {
        get("resultCount").textContent = filteredJobs.length;
    }

    if (filteredJobs.length === 0) {

        jobList.innerHTML = `
            <div class="empty-state">
                <b>No Jobs Found</b>
                Try another keyword or location.
            </div>
        `;

        return;
    }

    jobList.innerHTML = filteredJobs.map(job => {

        const link = job.source === "LinkedIn"
            ? `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title)}`
            : `https://pk.indeed.com/jobs?q=${encodeURIComponent(job.title)}`;

        return `
            <article class="job-row">

                <div class="company-logo">
                    ${job.company.charAt(0)}
                </div>

                <div>

                    <h3>${job.title}</h3>

                    <div class="company-name">
                        ${job.company} · ${job.location}
                    </div>

                    <div class="job-meta">

                        <span class="tag">${job.type}</span>
                        <span class="tag">${job.level}</span>
                        <span class="tag">${job.salary}</span>

                    </div>

                    <p>${job.desc}</p>

                    <div class="source-line">
                        Source: ${job.source} · Demo listing
                    </div>

                </div>

                <div class="job-row-actions">

                    <button class="save-btn"
                        onclick="toggleSave(${job.id})">
                        ${savedJobs.includes(job.id) ? "♥" : "♡"}
                    </button>

                    <a href="${link}"
                       target="_blank"
                       rel="noopener">
                       Apply Now ↗
                    </a>

                </div>

            </article>
        `;

    }).join("");

}

// 8. Save Jobs
function toggleSave(id) {

    if (savedJobs.includes(id)) {

        savedJobs = savedJobs.filter(jobId => jobId !== id);

        showMessage("Job removed from saved jobs.");

    } else {

        savedJobs.push(id);

        showMessage("Job saved successfully!");

    }

    localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
    );

    displayJobs();
    displayFeaturedJobs();
}

// 9. Featured Jobs
function displayFeaturedJobs() {

    const featured = get("featuredJobs");

    if (!featured) return;

    featured.innerHTML = jobs.slice(0, 3).map(job => {

        return `
            <article class="job-card">

                <div class="job-card-top">

                    <div class="company-logo">
                        ${job.company.charAt(0)}
                    </div>

                    <button class="save-btn ${
                        savedJobs.includes(job.id) ? "saved" : ""
                    }"
                    onclick="toggleSave(${job.id})">

                        ${savedJobs.includes(job.id) ? "♥" : "♡"}

                    </button>

                </div>

                <h3>${job.title}</h3>

                <div class="company-name">
                    ${job.company} · ${job.location}
                </div>

                <div class="job-meta">
                    <span class="tag">${job.type}</span>
                    <span class="tag">${job.level}</span>
                </div>

                <div class="job-card-foot">

                    <small>${job.salary}</small>

                    <a href="${
                        job.source === "LinkedIn"
                        ? "https://www.linkedin.com/jobs/"
                        : "https://pk.indeed.com/"
                    }" target="_blank" rel="noopener">
                        View Job ↗
                    </a>

                </div>

            </article>
        `;

    }).join("");

}

// 10. Category Section
const categories = [
    ["Technology", "⌘", "1200+"],
    ["Data & Analytics", "▥", "850+"],
    ["Design", "✎", "450+"],
    ["Marketing", "↗", "600+"],
    ["Business", "▦", "500+"],
    ["Finance", "$", "280+"]
];

function displayCategories() {

    const grid = get("categoryGrid");

    if (!grid) return;

    grid.innerHTML = categories.map(category => {

        return `
            <button class="category-card"
                onclick="searchCategory('${category[0]}')">

                <span class="category-icon">
                    ${category[1]}
                </span>

                <span>
                    <b>${category[0]}</b>
                    <small>${category[2]} opportunities</small>
                </span>

            </button>
        `;

    }).join("");

}

function searchCategory(category) {
    searchJobs(category, "");
}

// 11. Filters
document.querySelectorAll(".filter-chip").forEach(button => {

    button.addEventListener("click", function() {

        activeType = this.dataset.type;

        document.querySelectorAll(".filter-chip").forEach(btn => {
            btn.classList.remove("selected");
        });

        this.classList.add("selected");

        displayJobs();

    });

});

[
    "experienceFilter",
    "typeFilter",
    "categoryFilter",
    "sortJobs"
].forEach(id => {

    if (get(id)) {
        get(id).addEventListener("change", displayJobs);
    }

});

// Reset Filters
if (get("resetFilters")) {

    get("resetFilters").addEventListener("click", function() {

        [
            "experienceFilter",
            "typeFilter",
            "categoryFilter",
            "jobsKeyword",
            "jobsLocation"
        ].forEach(id => {
            if (get(id)) get(id).value = "";
        });

        activeType = "all";

        document.querySelectorAll(".filter-chip").forEach(btn => {
            btn.classList.toggle(
                "selected",
                btn.dataset.type === "all"
            );
        });

        displayJobs();

    });

}

// =================================
// 12. AI RESUME MATCHING DEMO
// =================================

function analyzeResume() {

    const resume = get("resumeText")?.value.toLowerCase().trim() || "";
    const description = get("jobDescription")?.value.toLowerCase().trim() || "";

    if (!resume || !description) {

        showMessage("Please enter resume and job description.");

        return;

    }

    // Extract Keywords
    const stopWords = [
        "and", "the", "for", "with", "your",
        "you", "are", "this", "that", "from",
        "will", "have", "has", "job", "role",
        "work", "team", "years", "year", "to",
        "of", "in", "on", "a", "an", "as",
        "or", "by", "is", "be", "we", "their",
        "experience", "skills", "knowledge"
    ];

    const keywords = description.match(/[a-z][a-z+#.\/-]{1,}/g) || [];

    const uniqueKeywords = [...new Set(keywords)]
        .filter(word => !stopWords.includes(word));

    const matched = uniqueKeywords.filter(word =>
        resume.includes(word)
    );

    const missing = uniqueKeywords.filter(word =>
        !resume.includes(word)
    );

    // Calculate Score
    const score = uniqueKeywords.length
        ? Math.round((matched.length / uniqueKeywords.length) * 100)
        : 0;

    // Update Score
    if (get("scoreValue")) {
        get("scoreValue").textContent = score + "%";
    }

    if (get("scoreLabel")) {
        get("scoreLabel").textContent =
            score >= 75 ? "Good Match" :
            score >= 45 ? "Potential Match" :
            "Keep Building";
    }

    if (get("scoreRing")) {

        get("scoreRing").style.background =
            `conic-gradient(
                #4bc78e 0deg,
                #4bc78e ${score * 3.6}deg,
                #39474b ${score * 3.6}deg 360deg
            )`;

    }

    // Match Message
    if (get("scoreMessage")) {

        get("scoreMessage").textContent =
            score >= 75
            ? "You have a strong match for this role."
            : score >= 45
            ? "You have a potential match. Review missing keywords."
            : "You need to improve your relevant skills and experience.";

    }

    // Matched Keywords
    if (get("matchedCount")) {
        get("matchedCount").textContent = matched.length + " found";
    }

    if (get("matchedWords")) {

        get("matchedWords").innerHTML = matched.length
            ? matched.map(word =>
                `<span class="keyword">${word}</span>`
              ).join("")
            : "<small>No matched keywords found.</small>";

    }

    // Missing Keywords
    if (get("missingCount")) {
        get("missingCount").textContent = missing.length + " missing";
    }

    if (get("missingWords")) {

        get("missingWords").innerHTML = missing.length
            ? missing.map(word =>
                `<span class="keyword missing">${word}</span>`
              ).join("")
            : "<small>No missing keywords found.</small>";

    }

    // Potential Improvement
    if (get("potentialText")) {

        get("potentialText").textContent =
            missing.length + " keywords to review";

    }

    // Recommendation
    if (get("recommendation")) {

        get("recommendation").textContent =
            missing.length
            ? "Review these skills: " + missing.slice(0, 8).join(", ")
            : "Your resume contains the detected job keywords.";

    }

    // Save Report
    window.lastReport = {
        score: score,
        matched: matched,
        missing: missing
    };

    // Show Result
    if (get("matchResults")) {

        get("matchResults").classList.remove("hidden");

        get("matchResults").scrollIntoView({
            behavior: "smooth"
        });

    }

    showMessage("Resume analysis completed!");

}

// Analyze Button
if (get("analyzeBtn")) {

    get("analyzeBtn").addEventListener("click", analyzeResume);

}

// 13. Resume Upload
if (get("resumeFile")) {

    get("resumeFile").addEventListener("change", function(event) {

        const file = event.target.files[0];

        if (!file) return;

        if (file.name.toLowerCase().endsWith(".txt")) {

            const reader = new FileReader();

            reader.onload = function() {

                get("resumeText").value = reader.result;

                showMessage("Resume uploaded successfully!");

            };

            reader.readAsText(file);

        } else {

            showMessage("Please paste your resume text. PDF and DOC reading needs an additional parser.");

        }

    });

}

// 14. Share Report
if (get("shareReport")) {

    get("shareReport").addEventListener("click", async function() {

        if (!window.lastReport) {

            showMessage("Please analyze your resume first.");

            return;

        }

        const report = `
CareerMatch Resume Report

Match Score: ${window.lastReport.score}%

Matched Keywords:
${window.lastReport.matched.join(", ")}

Missing Keywords:
${window.lastReport.missing.join(", ")}
        `;

        try {

            await navigator.clipboard.writeText(report);

            showMessage("Report copied successfully!");

        } catch (error) {

            showMessage("Clipboard not available. Copy the report manually.");

        }

    });

}

// =================================
// 15. INITIALIZE WEBSITE
// =================================

displayCategories();
displayFeaturedJobs();
displayJobs();

console.log("CareerMatch JavaScript loaded successfully!");
