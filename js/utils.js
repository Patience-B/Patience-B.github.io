// Utility functions for data processing

// Convert time string to hours
function timeToHours(timeStr) {
    if (!timeStr) return 0;
    const parts = timeStr.split(':');
    return parseInt(parts[0]) + parseInt(parts[1]) / 60 + parseInt(parts[2]) / 3600;
}

// Process raw data with calculated fields
function processData(rawData) {
    return rawData.map(row => ({
        ...row,
        screenHours: timeToHours(row.screenTime),
        dateFormatted: row.date.split('/').slice(0, 2).join('/'),
        dayMonth: new Date('20' + row.date.split('/')[2], row.date.split('/')[1] - 1, row.date.split('/')[0])
            .toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
    }));
}

// Calculate overall statistics
function calculateStats(processedData) {
    const nonZeroSteps = processedData.filter(d => d.steps > 0);
    
    return {
        avgBible: Math.round(processedData.reduce((sum, d) => sum + d.bible, 0) / processedData.length),
        avgSteps: Math.round(nonZeroSteps.reduce((sum, d) => sum + d.steps, 0) / nonZeroSteps.length),
        avgScreenHours: (processedData.reduce((sum, d) => sum + d.screenHours, 0) / processedData.length).toFixed(1),
        bibleGoalAchieved: processedData.filter(d => d.bible >= goals.bible).length,
        stepsGoalAchieved: processedData.filter(d => d.steps >= goals.steps).length,
        portfolioGoalAchieved: processedData.filter(d => d.portfolio >= goals.portfolio).length,
        screenTimeExceeded: processedData.filter(d => d.screenHours > goals.screenTimeMax).length,
        sandGoalAchieved: processedData.filter(d => d.sand >= goals.sand).length
    };
}

// Process weekly data
function processWeeklyData(processedData) {
    const weeklyData = {};
    
    processedData.forEach(row => {
        if (!weeklyData[row.week]) {
            weeklyData[row.week] = {
                bible: 0,
                steps: 0,
                sand: 0,
                portfolio: 0,
                screenHours: 0,
                days: 0
            };
        }
        weeklyData[row.week].bible += row.bible;
        weeklyData[row.week].steps += row.steps;
        weeklyData[row.week].sand += row.sand;
        weeklyData[row.week].portfolio += row.portfolio;
        weeklyData[row.week].screenHours += row.screenHours;
        weeklyData[row.week].days += 1;
    });

    return Object.entries(weeklyData).map(([week, data]) => ({
        week: `Week of ${new Date('20' + week.split('/')[2], week.split('/')[1] - 1, week.split('/')[0])
            .toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}`,
        ...data,
        screenHours: Math.round(data.screenHours * 10) / 10
    }));
}

// Update DOM elements with statistics
function updateOverviewStats(stats) {
    document.getElementById('avgBible').textContent = stats.avgBible;
    document.getElementById('avgSteps').textContent = stats.avgSteps.toLocaleString();
    document.getElementById('screenTimeExceed').textContent = 
        Math.round(stats.screenTimeExceeded / data.length * 100) + '%';
}

// Render goal comparison section
function renderGoalComparison(processedData, stats) {
    const goalComparison = document.getElementById('goalComparison');
    const goalData = [
        { name: 'Bible Study', avg: stats.avgBible, goal: goals.bible, unit: 'verses' },
        { name: 'Evening Walks', avg: stats.avgSteps, goal: goals.steps, unit: 'steps' },
        { 
            name: 'Portfolio Work', 
            avg: (processedData.reduce((sum, d) => sum + d.portfolio, 0) / processedData.length).toFixed(1), 
            goal: goals.portfolio, 
            unit: 'hrs' 
        },
        { name: 'Screen Time', avg: stats.avgScreenHours, goal: goals.screenTimeMax, unit: 'hrs', reverse: true }
    ];

    goalData.forEach(item => {
        const isAchieved = item.reverse ? 
            parseFloat(item.avg) <= item.goal : 
            parseFloat(item.avg) >= item.goal;
        
        const div = document.createElement('div');
        div.className = `goal-item ${isAchieved ? 'goal-achieved' : 'goal-missed'}`;
        div.innerHTML = `
            <span><strong>${item.name}:</strong></span>
            <span>${item.avg} / ${item.goal} ${item.unit}</span>
        `;
        goalComparison.appendChild(div);
    });
}

// Render weekly stats cards
function renderWeeklyStats(weeklyArray) {
    const weeklyStatsContainer = document.getElementById('weeklyStats');
    
    weeklyArray.forEach(week => {
        const card = document.createElement('div');
        card.className = 'week-card';
        card.innerHTML = `
            <div class="week-title">${week.week} (${week.days} days)</div>
            <div class="week-stats">
                <div class="week-stat">
                    <span>Bible Study:</span>
                    <span><strong>${week.bible} verses</strong></span>
                </div>
                <div class="week-stat">
                    <span>Steps:</span>
                    <span><strong>${week.steps.toLocaleString()}</strong></span>
                </div>
                <div class="week-stat">
                    <span>Sand Time:</span>
                    <span><strong>${week.sand} hours</strong></span>
                </div>
                <div class="week-stat">
                    <span>Portfolio:</span>
                    <span><strong>${week.portfolio} hours</strong></span>
                </div>
                <div class="week-stat">
                    <span>Screen Time:</span>
                    <span style="color: ${week.screenHours > goals.screenTimeMax * week.days ? colors.missed : colors.achieved}">
                        <strong>${week.screenHours} hours</strong>
                    </span>
                </div>
            </div>
        `;
        weeklyStatsContainer.appendChild(card);
    });
}

// Render accomplishments list
function renderAccomplishments(rawData) {
    const accomplishmentsList = document.getElementById('accomplishmentsList');
    const accomplishments = rawData.filter(d => d.accomplishment.trim() !== '');
    
    accomplishments.reverse().forEach(item => {
        const div = document.createElement('div');
        div.className = 'accomplishment-item';
        div.innerHTML = `
            <div class="accomplishment-date">${item.date}</div>
            <div>${item.accomplishment}</div>
        `;
        accomplishmentsList.appendChild(div);
    });
}
