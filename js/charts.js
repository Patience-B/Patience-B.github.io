// Chart creation and configuration functions

// Set global Chart.js defaults
function initializeChartDefaults() {
    Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    Chart.defaults.color = '#666';
}

// Create achievement rates chart
function createAchievementChart(processedData, stats) {
    const ctx = document.getElementById('achievementChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Bible Study', 'Steps', 'Sand Time', 'Portfolio', 'Screen Time (≤3h)'],
            datasets: [{
                label: 'Achievement Rate (%)',
                data: [
                    Math.round(stats.bibleGoalAchieved / processedData.length * 100),
                    Math.round(stats.stepsGoalAchieved / processedData.filter(d => d.steps > 0).length * 100),
                    Math.round(stats.sandGoalAchieved / processedData.length * 100),
                    Math.round(stats.portfolioGoalAchieved / processedData.length * 100),
                    Math.round((processedData.length - stats.screenTimeExceeded) / processedData.length * 100)
                ],
                backgroundColor: [
                    colors.bible,
                    colors.steps, 
                    colors.sand,
                    colors.portfolio,
                    colors.screenTime
                ],
                borderRadius: 6,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Create Bible study progress chart
function createBibleChart(processedData) {
    const ctx = document.getElementById('bibleChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: processedData.map(d => d.dayMonth),
            datasets: [{
                label: 'Bible Verses',
                data: processedData.map(d => d.bible),
                borderColor: colors.bible,
                backgroundColor: 'rgba(136, 132, 216, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Goal (14 verses)',
                data: Array(processedData.length).fill(goals.bible),
                borderColor: colors.goal,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Create steps chart
function createStepsChart(processedData) {
    const ctx = document.getElementById('stepsChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: processedData.map(d => d.dayMonth),
            datasets: [{
                label: 'Steps',
                data: processedData.map(d => d.steps),
                borderColor: colors.steps,
                backgroundColor: 'rgba(130, 202, 157, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Goal (7,000 steps)',
                data: Array(processedData.length).fill(goals.steps),
                borderColor: colors.goal,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Create screen time chart
function createScreenTimeChart(processedData) {
    const ctx = document.getElementById('screenTimeChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: processedData.map(d => d.dayMonth),
            datasets: [{
                label: 'Screen Time (hours)',
                data: processedData.map(d => d.screenHours),
                backgroundColor: processedData.map(d => d.screenHours > goals.screenTimeMax ? colors.screenTime : colors.steps),
                borderRadius: 4,
                borderSkipped: false
            }, {
                label: 'Goal (≤3 hours)',
                data: Array(processedData.length).fill(goals.screenTimeMax),
                type: 'line',
                borderColor: colors.goal,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Create portfolio work chart
function createPortfolioChart(processedData) {
    const ctx = document.getElementById('portfolioChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: processedData.map(d => d.dayMonth),
            datasets: [{
                label: 'Portfolio Hours',
                data: processedData.map(d => d.portfolio),
                backgroundColor: processedData.map(d => d.portfolio >= goals.portfolio ? colors.steps : colors.sand),
                borderRadius: 4,
                borderSkipped: false
            }, {
                label: 'Goal (1 hour)',
                data: Array(processedData.length).fill(goals.portfolio),
                type: 'line',
                borderColor: colors.goal,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Create weekly comparison chart
function createWeeklyChart(weeklyArray) {
    const ctx = document.getElementById('weeklyChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weeklyArray.map(w => w.week),
            datasets: [{
                label: 'Bible Verses',
                data: weeklyArray.map(w => w.bible),
                backgroundColor: colors.bible,
                yAxisID: 'y'
            }, {
                label: 'Steps (÷100)',
                data: weeklyArray.map(w => Math.round(w.steps / 100)),
                backgroundColor: colors.steps,
                yAxisID: 'y'
            }, {
                label: 'Sand Hours',
                data: weeklyArray.map(w => w.sand),
                backgroundColor: colors.sand,
                yAxisID: 'y'
            }, {
                label: 'Portfolio Hours',
                data: weeklyArray.map(w => w.portfolio),
                backgroundColor: colors.portfolio,
                yAxisID: 'y'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.dataset.label === 'Steps (÷100)') {
                                return `Steps: ${(context.parsed.y * 100).toLocaleString()}`;
                            }
                            return `${context.dataset.label}: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Week'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Values (Steps ÷ 100)'
                    }
                }
            }
        }
    });
}

// Initialize all charts
function initializeCharts(processedData, stats, weeklyArray) {
    initializeChartDefaults();
    createAchievementChart(processedData, stats);
    createBibleChart(processedData);
    createStepsChart(processedData);
    createScreenTimeChart(processedData);
    createPortfolioChart(processedData);
    createWeeklyChart(weeklyArray);
}
