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
            card.className = 'glass-card p-6 rounded-xl relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300';

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
                <button class="delete-btn absolute top-2 right-2 p-2 text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity z-20" data-id="${module.id}" title="Remove Module">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
                </button>

                <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-5 transition-opacity pointer-events-none">
                    <span class="text-6xl font-bold text-white module-icon">${module.name.charAt(0)}</span>
                </div>
                
                <div class="relative z-10">
                    <div class="flex flex-col gap-3 mb-4">
                        <input type="text" 
                            id="name-${module.id}"
                            class="config-input bg-transparent border-b border-transparent hover:border-slate-500 focus:border-indigo-400 text-xl font-bold text-white w-full outline-none transition-colors"
                            value="${module.name}">
                        
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-1 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                                <span class="text-indigo-300 text-xs">Coeff:</span>
                                <input type="number" min="1" max="10"
                                    id="coeff-${module.id}"
                                    class="config-input bg-transparent border-b border-transparent hover:border-slate-500 focus:border-indigo-400 text-indigo-300 text-xs w-8 outline-none text-center font-bold"
                                    value="${module.coeff}">
                            </div>

                            <select id="type-${module.id}" class="type-select bg-slate-800 text-xs text-slate-400 border border-slate-700 rounded px-2 py-1 outline-none focus:border-indigo-500">
                                <option value="0" ${module.type === 0 ? 'selected' : ''}>Exam Only</option>
                                <option value="1" ${module.type === 1 ? 'selected' : ''}>Exam + TD</option>
                                <option value="2" ${module.type === 2 ? 'selected' : ''}>Exam + TD + TP</option>
                            </select>
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

        // Add "Add Module" Card
        const addCard = document.createElement('div');
        addCard.className = 'glass-card p-6 rounded-xl flex flex-col justify-center items-center cursor-pointer hover:bg-slate-800/80 group min-h-[300px] border-dashed border-2 border-slate-700 hover:border-indigo-500/50';
        addCard.innerHTML = `
            <div class="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500 group-hover:text-indigo-400"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </div>
            <span class="text-slate-400 font-medium group-hover:text-indigo-300">Add Module</span>
        `;
        addCard.addEventListener('click', addModule);
        container.appendChild(addCard);

        attachEventListeners();
    }

    function addModule() {
        const id = 'mod_' + Date.now();
        modules.push({
            id: id,
            name: "New Module",
            coeff: 1,
            type: 1
        });
        saveModuleConfig();
        renderModules();
        calculateAll();
    }

    function removeModule(id) {
        if (confirm('Are you sure you want to delete this module?')) {
            modules = modules.filter(m => m.id !== id);
            delete savedData[id];
            saveModuleConfig();
            saveGrades(); // Save cleaned up grades
            renderModules();
            calculateAll();
        }
    }

    function attachEventListeners() {
        // Grade inputs
        document.querySelectorAll('.grade-input').forEach(input => {
            input.addEventListener('input', () => {
                saveGrades();
                calculateAll();
            });
        });

        // Config inputs (Name & Coeff)
        document.querySelectorAll('.config-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const parts = e.target.id.split('-');
                const field = parts[0];
                const id = parts[1];

                const module = modules.find(m => m.id === id);
                if (module) {
                    if (field === 'name') {
                        module.name = e.target.value;
                        const icon = e.target.closest('.glass-card').querySelector('.module-icon');
                        if (icon) icon.textContent = e.target.value.charAt(0) || '?';
                    } else if (field === 'coeff') {
                        module.coeff = parseFloat(e.target.value) || 1;
                    }
                    saveModuleConfig();
                    calculateAll();
                }
            });
        });

        // Type selection
        document.querySelectorAll('.type-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const id = e.target.id.split('-')[1];
                const module = modules.find(m => m.id === id);
                if (module) {
                    module.type = parseInt(e.target.value);
                    saveModuleConfig();
                    renderModules(); // Re-render to show/hide fields
                    calculateAll();
                }
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = btn.getAttribute('data-id');
                removeModule(id);
            });
        });
    }

    resetButton.addEventListener('click', () => {
        if (confirm('Clear all grades? (Module names and coefficients will stay)')) {
            localStorage.removeItem('grades');
            // Clear in-memory object too
            for (const key in savedData) delete savedData[key];

            document.querySelectorAll('.grade-input').forEach(input => input.value = '');
            calculateAll();
        }
    });

    restoreBtn.addEventListener('click', () => {
        if (confirm('Restore original modules? This will reset names, coefficients, custom modules, AND delete all grades.')) {
            localStorage.removeItem('modulesConfig');
            localStorage.removeItem('grades');
            location.reload();
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

            // Check current input values based on *current* DOM state, 
            // but rely on module.type for calculation logic.
            // Note: renderModules() ensures DOM matches module.type.

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
        // Only save grades for currently existing modules (cleanup happens in removeModule)
        modules.forEach(module => {
            const examInput = document.getElementById(`exam-${module.id}`);
            const tdInput = document.getElementById(`td-${module.id}`);
            const tpInput = document.getElementById(`tp-${module.id}`);

            savedData[module.id] = {
                exam: examInput ? examInput.value : null,
                td: tdInput ? tdInput.value : null,
                tp: tpInput ? tpInput.value : null
            };
        });
        localStorage.setItem('grades', JSON.stringify(savedData));
    }

    function saveModuleConfig() {
        localStorage.setItem('modulesConfig', JSON.stringify(modules));
    }

    // Initialize
    renderModules();
    calculateAll();
});
