document.addEventListener('DOMContentLoaded', () => {
    const defaultModules = [
        { id: 'analysis', name: "Analysis", coeff: 2, type: 2 },
        { id: 'ai', name: "AI", coeff: 3, type: 1 },
        { id: 'pld', name: "PLD", coeff: 3, type: 1 },
        { id: 'bdd', name: "BDD", coeff: 4, type: 1 },
        { id: 'software', name: "Software", coeff: 2, type: 2 },
        { id: 'mobile', name: "Mobile Development", coeff: 2, type: 1 },
        { id: 'compilation', name: "Compilation", coeff: 4, type: 2 }
    ];

    // Load configs or use defaults
    let modules = JSON.parse(localStorage.getItem('modulesConfig')) || JSON.parse(JSON.stringify(defaultModules));

    const container = document.getElementById('modules-container');
    const resultContainer = document.getElementById('results-body');
    const finalAverageEl = document.getElementById('final-average');
    const resetButton = document.getElementById('reset-btn');

    // Create Restore Defaults Button
    const restoreBtn = document.createElement('button');
    restoreBtn.textContent = "Restore Defaults";
    restoreBtn.className = "px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors text-sm border border-slate-700 ml-2";
    resetButton.parentNode.insertBefore(restoreBtn, resetButton);

    // Load saved grades
    const savedData = JSON.parse(localStorage.getItem('grades')) || {};

    function renderModules() {
        container.innerHTML = ''; // Clear existing
        modules.forEach(module => {
            const card = document.createElement('div');
            card.className = 'glass-card p-6 rounded-xl relative overflow-hidden group';

            let inputsHtml = `
                <div class="mb-4">
                    <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">Exam</label>
                    <input type="number" min="0" max="20" step="0.01" 
                        id="exam-${module.id}" 
                        class="grade-input input-field w-full rounded lg p-2 text-sm" 
                        placeholder="0-20"
                        value="${savedData[module.id]?.exam || ''}">
                </div>
            `;

            if (module.type >= 1) {
                inputsHtml += `
                <div class="mb-4">
                    <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">TD</label>
                    <input type="number" min="0" max="20" step="0.01" 
                        id="td-${module.id}" 
                        class="grade-input input-field w-full rounded lg p-2 text-sm" 
                        placeholder="0-20"
                        value="${savedData[module.id]?.td || ''}">
                </div>
                `;
            }

            if (module.type === 2) {
                inputsHtml += `
                <div class="mb-4">
                    <label class="block text-slate-400 text-xs uppercase tracking-wider mb-1">TP</label>
                    <input type="number" min="0" max="20" step="0.01" 
                        id="tp-${module.id}" 
                        class="grade-input input-field w-full rounded lg p-2 text-sm" 
                        placeholder="0-20"
                        value="${savedData[module.id]?.tp || ''}">
                </div>
                `;
            }

            card.innerHTML = `
                <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <span class="text-6xl font-bold text-white module-icon">${module.name.charAt(0)}</span>
                </div>
                <div class="relative z-10">
                    <div class="flex justify-between items-start mb-4 gap-2">
                        <input type="text" 
                            id="name-${module.id}"
                            class="config-input bg-transparent border-b border-transparent hover:border-slate-500 focus:border-indigo-400 text-xl font-bold text-white w-full outline-none transition-colors"
                            value="${module.name}">
                        
                        <div class="flex items-center gap-1 bg-indigo-500/20 px-2 py-1 rounded">
                            <span class="text-indigo-300 text-xs">Coeff:</span>
                            <input type="number" min="1" max="10"
                                id="coeff-${module.id}"
                                class="config-input bg-transparent border-b border-transparent hover:border-slate-500 focus:border-indigo-400 text-indigo-300 text-xs w-8 outline-none text-center font-bold"
                                value="${module.coeff}">
                        </div>
                    </div>
                    ${inputsHtml}
                    <div class="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
                        <span class="text-slate-400 text-sm">Average:</span>
                        <span id="avg-${module.id}" class="text-xl font-bold text-emerald-400">0.00</span>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

        attachEventListeners();
    }

    function attachEventListeners() {
        // Grade inputs
        document.querySelectorAll('.grade-input').forEach(input => {
            input.addEventListener('input', () => {
                // Save grade data
                saveGrades();
                calculateAll();
            });
        });

        // Config inputs (Name & Coeff)
        document.querySelectorAll('.config-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const parts = e.target.id.split('-');
                const type = parts[0]; // 'name' or 'coeff'
                const id = parts[1];

                const moduleIndex = modules.findIndex(m => m.id === id);
                if (moduleIndex > -1) {
                    if (type === 'name') {
                        modules[moduleIndex].name = e.target.value;
                        // Update background icon letter
                        const icon = e.target.closest('.glass-card').querySelector('.module-icon');
                        if (icon) icon.textContent = e.target.value.charAt(0) || '?';
                    } else if (type === 'coeff') {
                        modules[moduleIndex].coeff = parseFloat(e.target.value) || 1;
                    }
                    saveModuleConfig();
                    calculateAll(); // Re-calc average since coeff might change
                }
            });
        });
    }

    resetButton.addEventListener('click', () => {
        if (confirm('Clear all grades? (Module names and coefficients will stay)')) {
            localStorage.removeItem('grades');
            document.querySelectorAll('.grade-input').forEach(input => input.value = '');
            calculateAll();
        }
    });

    restoreBtn.addEventListener('click', () => {
        if (confirm('Restore original modules? This will reset names, coefficients, AND delete all grades.')) {
            localStorage.removeItem('modulesConfig');
            localStorage.removeItem('grades');
            location.reload(); // Simplest way to reset state
        }
    });

    function calculateAll() {
        let totalWeightedScore = 0;
        let totalCoeffs = 0;
        let resultsHtml = '';

        modules.forEach(module => {
            const examInput = document.getElementById(`exam-${module.id}`);
            const tdInput = document.getElementById(`td-${module.id}`);
            const tpInput = document.getElementById(`tp-${module.id}`);

            const exam = examInput ? (parseFloat(examInput.value) || 0) : 0;
            const td = tdInput ? (parseFloat(tdInput.value) || 0) : 0;
            const tp = tpInput ? (parseFloat(tpInput.value) || 0) : 0;

            let moduleAvg = 0;

            if (module.type === 0) {
                moduleAvg = exam;
            } else if (module.type === 1) {
                moduleAvg = (exam * 0.6) + (td * 0.4);
            } else if (module.type === 2) {
                const control = (td + tp) / 2;
                moduleAvg = (exam * 0.6) + (control * 0.4);
            }

            // Update card display
            const avgEl = document.getElementById(`avg-${module.id}`);
            if (avgEl) avgEl.textContent = moduleAvg.toFixed(2);

            // Add to semester calculation
            totalWeightedScore += moduleAvg * module.coeff;
            totalCoeffs += module.coeff;

            // Add to table
            resultsHtml += `
                <tr class="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                    <td class="py-3 px-4 text-slate-300">${module.name}</td>
                    <td class="py-3 px-4 text-right font-mono text-indigo-300">${moduleAvg.toFixed(2)}</td>
                    <td class="py-3 px-4 text-right text-slate-400">${module.coeff}</td>
                </tr>
            `;
        });

        const semesterAvg = totalCoeffs > 0 ? (totalWeightedScore / totalCoeffs) : 0;

        resultContainer.innerHTML = resultsHtml;
        finalAverageEl.textContent = semesterAvg.toFixed(2);

        // Dynamic coloring for grade
        if (semesterAvg >= 10) {
            finalAverageEl.className = "text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300";
        } else {
            finalAverageEl.className = "text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500";
        }
    }

    function saveGrades() {
        const data = {};
        modules.forEach(module => {
            const examInput = document.getElementById(`exam-${module.id}`);
            const tdInput = document.getElementById(`td-${module.id}`);
            const tpInput = document.getElementById(`tp-${module.id}`);

            data[module.id] = {
                exam: examInput ? examInput.value : null,
                td: tdInput ? tdInput.value : null,
                tp: tpInput ? tpInput.value : null
            };
        });
        localStorage.setItem('grades', JSON.stringify(data));
    }

    function saveModuleConfig() {
        localStorage.setItem('modulesConfig', JSON.stringify(modules));
    }

    // Initialize
    renderModules();
    calculateAll();
});
