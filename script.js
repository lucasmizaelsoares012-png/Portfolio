const username = 'lucasmizaelsoares012-png'; 
const container = document.querySelector('.github-projetos');

async function fetchGitHubProjects() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?type=all&sort=updated&per_page=10`);
        const repos = await response.json();

        container.innerHTML = ''; 

        repos.forEach(repo => {
            const emConstrucao = repo.topics && repo.topics.includes('em-construcao');
            
            const statusBadge = emConstrucao 
                ? `<span class="badge status-construcao">🚧 Em Construção</span>`
                : `<span class="badge status-pronto">✅ Pronto</span>`;

            const donoDoProjeto = repo.owner.login.toLowerCase() === username.toLowerCase() 
                ? 'Autor Principal' 
                : `Colaborador (@${repo.owner.login})`;

            const projectCard = `
                <div class="projetos-img">
                    <div class="projeto-header">
                        <h3 class="projeto-info">${repo.name}</h3>
                        ${statusBadge}
                    </div>
                    <span style="font-size: 0.8rem; color: var(--primaria); display: block; margin-bottom: 5px;">${donoDoProjeto}</span>
                    <p class="projeto-paragrafo">${repo.description || 'Sem descrição disponível no GitHub.'}</p>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="menu-link">Ver Código</a>
                </div>
            `;
            container.innerHTML += projectCard;
        });
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p>Não foi possível carregar os projetos no momento.</p>';
    }
}

fetchGitHubProjects(); 