const butCreate = document.querySelector("#but-create")
const butAnalyse = document.querySelector("#but-analyse")
const butVisualize = document.querySelector("#but-visualize")
const buttons = document.querySelectorAll(".headline-button")
const body = document.querySelector("#info")

let curriculo = {
    info: {
        nome: "",
        email: "",
        telefone: "",
        localizacao: "",
        resumo: "",
        foto: "",
        cargo: ""
    },
    experiencias: [],
    formacoes: [],
    habilidades: [],
    links: [
        { nome: "LinkedIn", url: "" },
        { nome: "GitHub", url: "" },
        { nome: "Instagram", url: "" },
        { nome: "Página", url: "" }
    ]
};

const dadosSalvos = localStorage.getItem("curriculo")
if (dadosSalvos) {
    curriculo = JSON.parse(dadosSalvos)
}

function salvarDados() {
    localStorage.setItem("curriculo", JSON.stringify(curriculo))
}

function renderAll() {
    renderExperiencias()
    renderFormacoes()
    renderHabilidades()
}

function renderExperiencias() {
    const elementExp = document.getElementById("element-exp")
    if (!elementExp) return
    elementExp.innerHTML = ""
    curriculo.experiencias.forEach(exp => {
        elementExp.innerHTML += `
      <div class="element-exp" data-id="${exp.id}">
        <h3>${exp.cargo}</h3>
        <h4>${exp.empresa}</h4>
        <span>${exp.periodo}</span>
        <p>${exp.descricao}</p>
        <div class="confirm-buttons">
          <button class="delete-card" type="button" data-action="delete" data-type="exp" data-id="${exp.id}">Excluir</button>
          <button class="delete-card" type="button" data-action="edit" data-type="exp" data-id="${exp.id}">Editar</button>
        </div>
      </div>
    `
    })
}

function renderFormacoes() {
    const elementForm = document.getElementById("element-form")
    if (!elementForm) return
    elementForm.innerHTML = ""
    curriculo.formacoes.forEach(form => {
        elementForm.innerHTML += `
      <div class="element-form" data-id="${form.id}">
        <h3>${form.curso}</h3>
        <h4>${form.instituicao}</h4>
        <span>${form.periodo}</span>
        <div class="confirm-buttons">
          <button class="delete-card" type="button" data-action="delete" data-type="form" data-id="${form.id}">Excluir</button>
          <button class="delete-card" type="button" data-action="edit" data-type="form" data-id="${form.id}">Editar</button>
        </div>
      </div>
    `
    })
}

function renderHabilidades() {
    const elementHab = document.getElementById("element-hab")
    if (!elementHab) return
    elementHab.innerHTML = ""
    curriculo.habilidades.forEach(hab => {
        elementHab.innerHTML += `
      <div class="element-hab" data-id="${hab.id}">
        <h3>${hab.habilidade}</h3>
        <span>${hab.nivel}</span>
        <div class="confirm-buttons">
          <button class="delete-card" type="button" data-action="delete" data-type="hab" data-id="${hab.id}">Excluir</button>
          <button class="delete-card" type="button" data-action="edit" data-type="hab" data-id="${hab.id}">Editar</button>
        </div>
      </div>
    `
    })
}

function deletarExperiencia(id) {
    curriculo.experiencias = curriculo.experiencias.filter(exp => exp.id !== id)
    salvarDados()
    renderAll()
}

function deletarFormacao(id) {
    curriculo.formacoes = curriculo.formacoes.filter(form => form.id !== id)
    salvarDados()
    renderAll()
}

function deletarHabilidade(id) {
    curriculo.habilidades = curriculo.habilidades.filter(hab => hab.id !== id)
    salvarDados()
    renderAll()
}

function editarExperiencia(id) {
    const exp = curriculo.experiencias.find(e => e.id === id)
    if (!exp) return
    const addExp = document.querySelector("#add-exp")
    const cardSelecionado = document.querySelector(`.element-exp[data-id="${id}"]`)
    if (!addExp || !cardSelecionado) return
    addExp.innerHTML = ""
    cardSelecionado.style.display = "none"
    addExp.innerHTML = `
    <div class="new-exp">
        <input id="text-exp-cargo" placeholder="Cargo" value="${exp.cargo}">
        <div id="ajuste-form">
            <input id="text-exp-empresa" placeholder="Empresa" value="${exp.empresa}">
            <input id="text-exp-periodo" placeholder="Período" value="${exp.periodo}">
        </div>
        <textarea id="text-exp-descreva" placeholder="Descrição">${exp.descricao}</textarea>
        <div class="confirm-buttons">
            <button id="save-exp" type="button" class="delete-card">Salvar</button>
            <button id="undo-exp" type="button" class="delete-card">Cancelar</button>
        </div>
    </div>
    `
    document.querySelector("#save-exp").onclick = () => {
        exp.cargo = document.querySelector("#text-exp-cargo").value.trim()
        exp.empresa = document.querySelector("#text-exp-empresa").value.trim()
        exp.periodo = document.querySelector("#text-exp-periodo").value.trim()
        exp.descricao = document.querySelector("#text-exp-descreva").value.trim()
        salvarDados()
        addExp.innerHTML = ""
        renderAll()
    }
    document.querySelector("#undo-exp").onclick = () => {
        addExp.innerHTML = ""
        cardSelecionado.style.display = "block"
    }
}

function editarFormacao(id) {
    const form = curriculo.formacoes.find(f => f.id === id)
    if (!form) return
    const addForm = document.querySelector("#add-form")
    const cardSelecionado = document.querySelector(`.element-form[data-id="${id}"]`)
    if (!addForm || !cardSelecionado) return
    addForm.innerHTML = ""
    cardSelecionado.style.display = "none"
    addForm.innerHTML = `
    <div class="new-form">
        <div id="ajuste-form">
            <input id="text-form-curso" placeholder="Curso" value="${form.curso}">
            <input id="text-form-empresa" placeholder="Instituição" value="${form.instituicao}">
        </div>
        <input id="text-form-periodo" placeholder="Período" value="${form.periodo}">
        <div class="confirm-buttons">
            <button id="save-form" type="button" class="delete-card">Salvar</button>
            <button id="undo-form" type="button" class="delete-card">Cancelar</button>
        </div>
    </div>
    `
    document.querySelector("#save-form").onclick = () => {
        form.curso = document.querySelector("#text-form-curso").value.trim()
        form.instituicao = document.querySelector("#text-form-empresa").value.trim()
        form.periodo = document.querySelector("#text-form-periodo").value.trim()
        salvarDados()
        addForm.innerHTML = ""
        renderAll()
    }
    document.querySelector("#undo-form").onclick = () => {
        addForm.innerHTML = ""
        cardSelecionado.style.display = "block"
    }
}

function editarHabilidade(id) {
    const hab = curriculo.habilidades.find(h => h.id === id)
    if (!hab) return
    const addHab = document.querySelector("#add-hab")
    const cardSelecionado = document.querySelector(`.element-hab[data-id="${id}"]`)
    if (!addHab || !cardSelecionado) return
    addHab.innerHTML = ""
    cardSelecionado.style.display = "none"
    addHab.innerHTML = `
    <div class="new-hab">
        <div id="ajuste-hab">
            <input id="text-hab-name" placeholder="Habilidade" value="${hab.habilidade}">
            <select id="select-hab">
                <option ${hab.nivel === "Básico" ? "selected" : ""}>Básico</option>
                <option ${hab.nivel === "Intermediário" ? "selected" : ""}>Intermediário</option>
                <option ${hab.nivel === "Avançado" ? "selected" : ""}>Avançado</option>
                <option ${hab.nivel === "Especialista" ? "selected" : ""}>Especialista</option>
            </select>
        </div>
        <div class="confirm-buttons">
            <button id="save-hab" type="button" class="delete-card">Salvar</button>
            <button id="undo-hab" type="button" class="delete-card">Cancelar</button>
        </div>
    </div>
    `
    document.querySelector("#save-hab").onclick = () => {
        hab.habilidade = document.querySelector("#text-hab-name").value.trim()
        hab.nivel = document.querySelector("#select-hab").value
        salvarDados()
        addHab.innerHTML = ""
        renderAll()
    }
    document.querySelector("#undo-hab").onclick = () => {
        addHab.innerHTML = ""
        cardSelecionado.style.display = "block"
    }
}

function initCardActionsDelegation() {
    const container = document.getElementById("add-elements")
    if (!container) return
    if (container.dataset.bound === "1") return
    container.dataset.bound = "1"
    container.addEventListener("click", (e) => {
        const btn = e.target.closest('button[data-action][data-type][data-id]')
        if (!btn) return
        const action = btn.dataset.action
        const type = btn.dataset.type
        const id = btn.dataset.id
        if (type === "exp") {
            if (action === "edit") editarExperiencia(id)
            else if (action === "delete") deletarExperiencia(id)
        } else if (type === "form") {
            if (action === "edit") editarFormacao(id)
            else if (action === "delete") deletarFormacao(id)
        } else if (type === "hab") {
            if (action === "edit") editarHabilidade(id)
            else if (action === "delete") deletarHabilidade(id)
        }
    })
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("selected"))
        button.classList.add("selected")
    })
})

butCreate.addEventListener("click", () => {
    body.innerHTML = `
<h3 class="h3-info">Informações Pessoais</h3>
<div id="info-grid">
<div class="info-items">
<p class="subt_info">Nome completo</p>
<input class="info-text" id="name" list="name-history">
<datalist id="name-history"></datalist>
</div>
<div class="info-items">
<p class="subt_info">E-mail</p>
<input class="info-text" id="email" type="email">
</div>
<div class="info-items">
<p class="subt_info">Telefone</p>
<input class="info-text" id="telefone">
</div>
<div class="info-items">
<p class="subt_info">Localização</p>
<input class="info-text" id="location" list="location-history">
<datalist id="location-history"></datalist>
</div>
<div class="info-items">
<p class="subt_info">Cargo</p>
<input class="info-text" id="cargo" list="cargo-history">
<datalist id="cargo-history"></datalist>
</div>
<div class="info-items">
<p class="subt_info">Foto</p>
<input type="file" id="photo-upload" accept="image/*">
</div>
<div class="info-items link-item">
<p class="subt_info">LinkedIn</p>
<input class="info-text" id="link-linkedin">
</div>
<div class="info-items link-item">
<p class="subt_info">GitHub</p>
<input class="info-text" id="link-github">
</div>
<div class="info-items link-item">
<p class="subt_info">Instagram</p>
<input class="info-text" id="link-instagram">
</div>
<div class="info-items link-item">
<p class="subt_info">Página própria</p>
<input class="info-text" id="link-pagina">
</div>
</div>
<p class="subt_info" id="subtext3">Resumo Profissional</p>
<textarea id="info-text2"></textarea>
<div id="info-buttons">
<button type="button" id="save-info">salvar</button>
<button type="button" id="undo-info">apagar</button>
</div>
<section id="exp">
  <div class="other-info">
    <h3 class="h3-info">Experiência Profissional</h3>
    <button class="but-info" id="but-exp">+ Adicionar</button>
  </div>
  <div id="add-exp">
    <p class="p-info">Nenhuma experiência adicionada ainda.</p>
  </div>
</section>
<section id="form">
  <div class="other-info">
    <h3 class="h3-info">Formação Acadêmica</h3>
    <button class="but-info" id="but-form">+ Adicionar</button>
  </div>
  <div id="add-form">
    <p class="p-info">Nenhuma formação adicionada ainda.</p>
  </div>
</section>
<section id="hab">
  <div class="other-info">
    <h3 class="h3-info">Habilidades</h3>
    <button class="but-info" id="but-hab">+ Adicionar</button>
  </div>
  <div id="add-hab">
    <p class="p-info">Nenhuma habilidade adicionada ainda.</p>
  </div>
</section>
<section id="add-elements">
  <div id="element-exp"></div>
  <div id="element-form"></div>
  <div id="element-hab"></div>
</section>
<section id="ai-suggestions" class="ai-suggestions"></section>
`

    const saveInfo = document.querySelector("#save-info")
    const undoInfo = document.querySelector("#undo-info")
    const nameInput = document.querySelector("#name")
    const emailInput = document.querySelector("#email")
    const telefoneInput = document.querySelector("#telefone")
    const locationInput = document.querySelector("#location")
    const cargoInput = document.querySelector("#cargo")
    const resumoInput = document.querySelector("#info-text2")
    const linkedinInput = document.querySelector("#link-linkedin")
    const githubInput = document.querySelector("#link-github")
    const instagramInput = document.querySelector("#link-instagram")
    const paginaInput = document.querySelector("#link-pagina")
    const photoInput = document.querySelector("#photo-upload")

    photoInput.addEventListener("change", () => {
        const file = photoInput.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = function () {
            curriculo.info.foto = reader.result
            salvarDados()
        }
        reader.readAsDataURL(file)
    })

    function salvarHistorico(chave, valor) {
        if (!valor.trim()) return
        let lista = JSON.parse(localStorage.getItem(chave)) || []
        if (!lista.includes(valor)) {
            lista.unshift(valor)
            lista = lista.slice(0, 10)
            localStorage.setItem(chave, JSON.stringify(lista))
        }
    }

    function carregarHistorico(chave, id) {
        const dados = JSON.parse(localStorage.getItem(chave)) || []
        const lista = document.querySelector(id)
        lista.innerHTML = ""
        dados.forEach(item => {
            lista.innerHTML += `<option value="${item}">`
        })
    }

    carregarHistorico("historico-nome", "#name-history")
    carregarHistorico("historico-cargo", "#cargo-history")
    carregarHistorico("historico-local", "#location-history")

    telefoneInput.addEventListener("input", () => {
        let numero = telefoneInput.value.replace(/\D/g, "")
        numero = numero.substring(0, 11)
        if (numero.length > 6) {
            numero = numero.replace(/(\d{2})(\d{5})(\d+)/, "($1) $2-$3")
        } else if (numero.length > 2) {
            numero = numero.replace(/(\d{2})(\d+)/, "($1) $2")
        }
        telefoneInput.value = numero
    })

    emailInput.addEventListener("input", () => {
        emailInput.value = emailInput.value.toLowerCase().replace(/\s/g, "")
    })

    locationInput.addEventListener("blur", () => {
        let local = locationInput.value.trim()
        if (!local.includes("-")) return
        let partes = local.split("-")
        let cidade = partes[0].trim()
        let estado = partes[1].trim().toUpperCase()
        locationInput.value = `${cidade} - ${estado}`
    })

    linkedinInput.addEventListener("focus", () => {
        if (linkedinInput.value === "") linkedinInput.value = "https://www.linkedin.com/in/"
    })
    githubInput.addEventListener("focus", () => {
        if (githubInput.value === "") githubInput.value = "https://www.github.com/"
    })
    instagramInput.addEventListener("focus", () => {
        if (instagramInput.value === "") instagramInput.value = "https://www.instagram.com/"
    })

    const butExp = document.querySelector("#but-exp")
    const butForm = document.querySelector("#but-form")
    const butHab = document.querySelector("#but-hab")
    const addExp = document.querySelector("#add-exp")
    const addForm = document.querySelector("#add-form")
    const addHab = document.querySelector("#add-hab")

    nameInput.value = curriculo.info.nome || ""
    emailInput.value = curriculo.info.email || ""
    telefoneInput.value = curriculo.info.telefone || ""
    locationInput.value = curriculo.info.localizacao || ""
    cargoInput.value = curriculo.info.cargo || ""
    resumoInput.value = curriculo.info.resumo || ""
    linkedinInput.value = curriculo.links?.[0]?.url || ""
    githubInput.value = curriculo.links?.[1]?.url || ""
    instagramInput.value = curriculo.links?.[2]?.url || ""
    paginaInput.value = curriculo.links?.[3]?.url || ""

    const inputs = [
        nameInput,
        emailInput,
        telefoneInput,
        locationInput,
        cargoInput,
        resumoInput,
        linkedinInput,
        githubInput,
        instagramInput,
        paginaInput
    ]

    if (curriculo.info.nome) {
        alterarEstadoInputs(inputs, true)
        saveInfo.textContent = "editar"
    }

    saveInfo.addEventListener("click", () => {
        if (saveInfo.textContent === "editar") {
            alterarEstadoInputs(inputs, false)
            saveInfo.textContent = "salvar"
            return
        }

        curriculo.info = {
            nome: nameInput.value.trim(),
            email: emailInput.value.trim(),
            telefone: telefoneInput.value.trim(),
            localizacao: locationInput.value.trim(),
            cargo: cargoInput.value.trim(),
            resumo: resumoInput.value.trim(),
            foto: curriculo.info.foto || ""
        }

        curriculo.links = [
            { nome: "LinkedIn", url: linkedinInput.value.trim() },
            { nome: "GitHub", url: githubInput.value.trim() },
            { nome: "Instagram", url: instagramInput.value.trim() },
            { nome: "Página", url: paginaInput.value.trim() }
        ]

        salvarHistorico("historico-nome", nameInput.value)
        salvarHistorico("historico-cargo", cargoInput.value)
        salvarHistorico("historico-local", locationInput.value)

        salvarDados()
        alterarEstadoInputs(inputs, true)
        saveInfo.textContent = "editar"
    })

    undoInfo.addEventListener("click", () => {
        curriculo.info = {
            nome: "",
            email: "",
            telefone: "",
            localizacao: "",
            cargo: "",
            resumo: "",
            foto: ""
        }

        curriculo.links = [
            { nome: "LinkedIn", url: "" },
            { nome: "GitHub", url: "" },
            { nome: "Instagram", url: "" },
            { nome: "Página", url: "" }
        ]

        salvarDados()
        alterarEstadoInputs(inputs, false)
        inputs.forEach(input => { input.value = "" })
        saveInfo.textContent = "salvar"
    })

    butExp.addEventListener("click", () => {
        addExp.innerHTML = `
        <div class="new-exp">
            <input id="text-exp-cargo" placeholder="Cargo">
            <div id="ajuste-form">
                <input id="text-exp-empresa" placeholder="Empresa">
                <input id="text-exp-periodo" placeholder="Período">
            </div>
            <textarea id="text-exp-descreva" placeholder="Descrição"></textarea>
            <div class="confirm-buttons">
                <button id="save-exp" class="delete-card" type="button">Salvar</button>
                <button id="undo-exp" class="delete-card" type="button">Cancelar</button>
            </div>
        </div>
        `

        document.querySelector("#save-exp").addEventListener("click", () => {
            curriculo.experiencias.push({
                id: crypto.randomUUID(),
                cargo: document.querySelector("#text-exp-cargo").value.trim(),
                empresa: document.querySelector("#text-exp-empresa").value.trim(),
                periodo: document.querySelector("#text-exp-periodo").value.trim(),
                descricao: document.querySelector("#text-exp-descreva").value.trim()
            })
            salvarDados()
            addExp.innerHTML = ""
            renderAll()
        })

        document.querySelector("#undo-exp").addEventListener("click", () => {
            addExp.innerHTML = ""
        })
    })

    butForm.addEventListener("click", () => {
        addForm.innerHTML = `
        <div class="new-form">
            <div id="ajuste-form">
                <input id="text-form-curso" placeholder="Curso">
                <input id="text-form-empresa" placeholder="Instituição">
            </div>
            <input id="text-form-periodo" placeholder="Período">
            <div class="confirm-buttons">
                <button id="save-form" class="delete-card" type="button">Salvar</button>
                <button id="undo-form" class="delete-card" type="button">Cancelar</button>
            </div>
        </div>
        `

        document.querySelector("#save-form").addEventListener("click", () => {
            curriculo.formacoes.push({
                id: crypto.randomUUID(),
                curso: document.querySelector("#text-form-curso").value.trim(),
                instituicao: document.querySelector("#text-form-empresa").value.trim(),
                periodo: document.querySelector("#text-form-periodo").value.trim()
            })
            salvarDados()
            addForm.innerHTML = ""
            renderAll()
        })

        document.querySelector("#undo-form").addEventListener("click", () => {
            addForm.innerHTML = ""
        })
    })

    butHab.addEventListener("click", () => {
        addHab.innerHTML = `
        <div class="new-hab">
            <div id="ajuste-hab">
                <input id="text-hab-name" placeholder="Habilidade">
                <select id="select-hab">
                    <option>Básico</option>
                    <option>Intermediário</option>
                    <option>Avançado</option>
                    <option>Especialista</option>
                </select>
            </div>
            <div class="confirm-buttons">
                <button id="save-hab" class="delete-card" type="button">Salvar</button>
                <button id="undo-hab" class="delete-card" type="button">Cancelar</button>
            </div>
        </div>
        `

        document.querySelector("#save-hab").addEventListener("click", () => {
            curriculo.habilidades.push({
                id: crypto.randomUUID(),
                habilidade: document.querySelector("#text-hab-name").value.trim(),
                nivel: document.querySelector("#select-hab").value
            })
            salvarDados()
            addHab.innerHTML = ""
            renderAll()
        })

        document.querySelector("#undo-hab").addEventListener("click", () => {
            addHab.innerHTML = ""
        })
    })

    renderAll()
    initCardActionsDelegation()
})

function alterarEstadoInputs(inputs, bloqueado) {
    inputs.forEach(input => {
        input.disabled = bloqueado
        if (bloqueado) {
            input.style.opacity = "0.6"
            input.style.cursor = "not-allowed"
        } else {
            input.style.opacity = "1"
            input.style.cursor = "text"
        }
    })
}

butAnalyse.addEventListener("click", () => {
    body.innerHTML = `
        <section id="analyse-container">
            <h3 id="title-an">Análise de Currículo</h3>
            <p id="upload">
                Faça upload do seu currículo em PDF para extração automática de dados
            </p>
            <label id="upload-area" for="upload-cv">
                <div id="upload-content">
                    <div id="upload-icon">↑</div>
                    <h4>Arraste seu currículo aqui</h4>
                    <p>ou clique para selecionar um arquivo PDF</p>
                    <span id="upload-format">PDF • Máx. 10MB</span>
                </div>
                <input type="file" id="upload-cv" accept="application/pdf">
            </label>
            <button id="start-analysis">Analisar Currículo</button>
            <p id="status"></p>
        </section>
    `

    const fileInput = document.querySelector("#upload-cv")
    const uploadContent = document.querySelector("#upload-content")
    const status = document.querySelector("#status")
    const btn = document.querySelector("#start-analysis")

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0]
        if (!file) return
        uploadContent.innerHTML = `
        <div id="upload-success">
            <div id="upload-success-icon">✓</div>
            <h4>${file.name}</h4>
            <p>Arquivo carregado com sucesso</p>
            <span id="upload-format">
                ${(file.size / 1024 / 1024).toFixed(2)} MB
            </span>
        </div>
        `
    })

    btn.addEventListener("click", async () => {
        const file = fileInput.files[0]
        if (!file) {
            status.innerText = "Selecione um arquivo PDF"
            return
        }

        status.innerText = "Lendo PDF..."
        const reader = new FileReader()

        reader.onload = async function () {
            const typedarray = new Uint8Array(this.result)
            const pdf = await pdfjsLib.getDocument(typedarray).promise
            let fullText = ""
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i)
                const content = await page.getTextContent()
                const strings = content.items.map(item => item.str).join(" ")
                fullText += strings + "\n"
            }

            status.innerText = "Extraindo dados..."
            const sucesso = await parsePDFToCurriculo(fullText)
            if (!sucesso) {
                status.innerText = "Erro ao analisar currículo"
                return
            }

            status.innerText = "Dados encontrados! Preenchendo currículo..."
            setTimeout(async () => {
                butCreate.click()
                await requestAISuggestions()
            }, 1200)
        }

        reader.readAsArrayBuffer(file)
    })
})

async function parsePDFToCurriculo(text) {
    try {
        const response = await fetch("http://localhost:3000/analyze-cv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        })

        if (!response.ok) throw new Error("Erro ao analisar currículo")

        const data = await response.json()
        curriculo.info = { ...curriculo.info, ...data.info }
        curriculo.experiencias = data.experiencias || []
        curriculo.formacoes = data.formacoes || []
        curriculo.habilidades = data.habilidades || []

        curriculo.experiencias = curriculo.experiencias.map(e => ({ ...e, id: e.id || crypto.randomUUID() }))
        curriculo.formacoes = curriculo.formacoes.map(f => ({ ...f, id: f.id || crypto.randomUUID() }))
        curriculo.habilidades = curriculo.habilidades.map(h => ({ ...h, id: h.id || crypto.randomUUID() }))

        salvarDados()
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

butVisualize.addEventListener("click", () => {
    body.innerHTML = `
        <section id="visualize-container">
            <div id="template-selector">
                <button class="template-button selected-template" data-template="modern">Neo Corporate</button>
                <button class="template-button" data-template="minimal">Cyber minimal</button>
                <button class="template-button" data-template="executive">Glass AI Resume</button>
                <button class="template-button" data-template="dark">Dev Portfolio Resume</button>
                <button class="template-button" data-template="creative">Luxury Executive</button>
            </div>
            <section id="pdf-preview-container">
                <div id="pdf-preview">
                    <div id="resume-template"></div>
                </div>
            </section>
            <section id="pdf-actions">
                <button id="download-pdf">Baixar PDF</button>
                <button id="share-pdf">Compartilhar</button>
            </section>
        </section>
    `
    initPDFSystem()
})

function initPDFSystem() {
    let currentTemplate = "modern"
    renderTemplate(currentTemplate)

    const templateButtons = document.querySelectorAll(".template-button")
    templateButtons.forEach(button => {
        button.addEventListener("click", () => {
            templateButtons.forEach(btn => btn.classList.remove("selected-template"))
            button.classList.add("selected-template")
            currentTemplate = button.dataset.template
            renderTemplate(currentTemplate)
        })
    })

    document.querySelector("#download-pdf").addEventListener("click", () => {
        downloadPDF(currentTemplate)
    })

    document.querySelector("#share-pdf").addEventListener("click", () => {
        sharePDF()
    })
}

function renderTemplate(template) {
    const preview = document.querySelector("#resume-template")
    if (!preview) return
    switch (template) {
        case "modern":
            preview.innerHTML = neoCorporateTemplate()
            break
        case "minimal":
            preview.innerHTML = cyberMinimalTemplate()
            break
        case "executive":
            preview.innerHTML = glassAITemplate()
            break
        case "dark":
            preview.innerHTML = devPortfolioTemplate()
            break
        case "creative":
            preview.innerHTML = luxuryExecutiveTemplate()
            break
    }
}

function neoCorporateTemplate() {
    return `
        <div class="resume neo-corporate">
            <div class="neo-top-bar"></div>
            <section class="neo-header">
                <div class="neo-user">
                    <div class="neo-photo">
                        ${curriculo.info.foto ? `<img src="${curriculo.info.foto}">` : `<span>${(curriculo.info.nome || "S")[0]}</span>`}
                    </div>
                    <div class="neo-user-info">
                        <h1>${curriculo.info.nome || "Seu Nome"}</h1>
                        <h2>${curriculo.info.cargo || "Profissional"}</h2>
                        <p>${(curriculo.info.resumo || "").slice(0, 220)}</p>
                    </div>
                </div>
                <div class="neo-contact">
                    <span>${curriculo.info.telefone || ""}</span>
                    <span>${curriculo.info.email || ""}</span>
                    <span>${curriculo.info.localizacao || ""}</span>
                </div>
            </section>
            <section class="neo-main">
                <div class="neo-left">
                    <div class="neo-section">
                        <h3>Experiência</h3>
                        ${curriculo.experiencias.map(exp => `
                            <div class="neo-card">
                                <div class="neo-card-header">
                                    <div>
                                        <h4>${exp.cargo}</h4>
                                        <h5>${exp.empresa}</h5>
                                    </div>
                                    <span>${exp.periodo}</span>
                                </div>
                                <p>${exp.descricao}</p>
                            </div>
                        `).join("")}
                    </div>
                    <div class="neo-section">
                        <h3>Formação</h3>
                        ${curriculo.formacoes.map(form => `
                            <div class="neo-card">
                                <div class="neo-card-header">
                                    <div>
                                        <h4>${form.curso}</h4>
                                        <h5>${form.instituicao}</h5>
                                    </div>
                                    <span>${form.periodo}</span>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
                <div class="neo-right">
                    <div class="neo-side-section">
                        <h3>Skills</h3>
                        ${curriculo.habilidades.map(hab => `
                            <div class="neo-skill">
                                <div class="neo-skill-top">
                                    <span>${hab.habilidade}</span>
                                    <span>${hab.nivel}</span>
                                </div>
                                <div class="neo-progress">
                                    <div class="neo-progress-fill" style="width:${hab.nivel === "Básico" ? "25%" : hab.nivel === "Intermediário" ? "50%" : hab.nivel === "Avançado" ? "75%" : "100%"}"></div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </section>
            <div class="neo-footer"></div>
        </div>
    `
}

function cyberMinimalTemplate() {
    return `
    <div class="resume cyber-minimal">
        <aside class="cyber-sidebar">
            <div class="cyber-profile">
                <div class="cyber-photo">
                    ${curriculo.info.foto ? `<img src="${curriculo.info.foto}">` : `<span>${(curriculo.info.nome || "S")[0]}</span>`}
                </div>
                <h1>${curriculo.info.nome || "Seu Nome"}</h1>
                <p>${curriculo.info.cargo || "Profissional"}</p>
            </div>
            <div class="cyber-side-card">
                <h3>Professional Skills</h3>
                ${curriculo.habilidades.map(hab => `
                    <div class="cyber-skill">
                        <div class="cyber-skill-top">
                            <span>${hab.habilidade}</span>
                            <span>${hab.nivel}</span>
                        </div>
                        <div class="cyber-progress">
                            <div class="cyber-fill" style="width:${hab.nivel === "Básico" ? "25%" : hab.nivel === "Intermediário" ? "50%" : hab.nivel === "Avançado" ? "75%" : "100%"}"></div>
                        </div>
                    </div>
                `).join("")}
            </div>
            <div class="cyber-side-card">
                <h3>Contact</h3>
                <p class="cyber-contact">${curriculo.info.email || ""}</p>
                <p class="cyber-contact">${curriculo.info.telefone || ""}</p>
                <p class="cyber-contact">${curriculo.info.localizacao || ""}</p>
            </div>
        </aside>
        <main class="cyber-main">
            <section class="cyber-section">
                <h2>About Me</h2>
                <p>${curriculo.info.resumo || ""}</p>
            </section>
            <section class="cyber-section">
                <h2>Work Experience</h2>
                ${curriculo.experiencias.map(exp => `
                    <div class="cyber-card">
                        <span>${exp.periodo}</span>
                        <h3>${exp.cargo}</h3>
                        <h4>${exp.empresa}</h4>
                        <p>${exp.descricao}</p>
                    </div>
                `).join("")}
            </section>
            <section class="cyber-section">
                <h2>Education</h2>
                ${curriculo.formacoes.map(form => `
                    <div class="cyber-card">
                        <span>${form.periodo}</span>
                        <h3>${form.curso}</h3>
                        <h4>${form.instituicao}</h4>
                    </div>
                `).join("")}
            </section>
        </main>
    </div>
`
}

function glassAITemplate() {
    return `
    <div class="resume glass-ai">
        <div class="glass-shape glass-shape-1"></div>
        <div class="glass-shape glass-shape-2"></div>
        <div class="glass-shape glass-shape-3"></div>
        <section class="glass-header">
            <div class="glass-profile">
                <div class="glass-photo">
                    ${curriculo.info.foto ? `<img src="${curriculo.info.foto}">` : `<span>${(curriculo.info.nome || "S")[0]}</span>`}
                </div>
                <div>
                    <h1>${curriculo.info.nome || "Seu Nome"}</h1>
                    <h2>${curriculo.info.cargo || "Profissional"}</h2>
                </div>
            </div>
        </section>
        <section class="glass-grid">
            <div class="glass-card profile-card">
                <h3>PROFILE</h3>
                <p>${curriculo.info.resumo || ""}</p>
                <div class="glass-contact-row">
                    <div class="glass-contact-item">${curriculo.info.email || ""}</div>
                    <div class="glass-contact-item">${curriculo.info.telefone || ""}</div>
                    <div class="glass-contact-item">${curriculo.info.localizacao || ""}</div>
                </div>
            </div>
            <div class="glass-card">
                <h3>EXPERIENCE</h3>
                ${curriculo.experiencias.map(exp => `
                    <div class="glass-item">
                        <span>${exp.periodo}</span>
                        <h4>${exp.cargo}</h4>
                        <strong>${exp.empresa}</strong>
                        <p>${exp.descricao}</p>
                    </div>
                `).join("")}
            </div>
            <div class="glass-card">
                <h3>EDUCATION</h3>
                ${curriculo.formacoes.map(form => `
                    <div class="glass-item">
                        <span>${form.periodo}</span>
                        <h4>${form.curso}</h4>
                        <strong>${form.instituicao}</strong>
                    </div>
                `).join("")}
            </div>
            <div class="glass-card">
                <h3>SKILLS</h3>
                ${curriculo.habilidades.map(hab => `
                    <div class="glass-skill">
                        <span>${hab.habilidade}</span>
                        <div class="glass-progress">
                            <div class="glass-fill" style="width:${hab.nivel === "Básico" ? "25%" : hab.nivel === "Intermediário" ? "50%" : hab.nivel === "Avançado" ? "75%" : "100%"}"></div>
                        </div>
                    </div>
                `).join("")}
            </div>
        </section>
    </div>
`
}

function devPortfolioTemplate() {
    return `
    <div class="resume dev-portfolio">
        <aside class="dev-sidebar">
            <div class="dev-profile">
                <div class="dev-photo">
                    ${curriculo.info.foto ? `<img src="${curriculo.info.foto}">` : `<span>${(curriculo.info.nome || "S")[0]}</span>`}
                </div>
                <h1>${curriculo.info.nome || "Seu Nome"}</h1>
                <h2>${curriculo.info.cargo || "Front-end Developer"}</h2>
            </div>
            <div class="dev-block">
                <h3>Contact</h3>
                <p>${curriculo.info.email || ""}</p>
                <p>${curriculo.info.telefone || ""}</p>
                <p>${curriculo.info.localizacao || ""}</p>
            </div>
            <div class="dev-block">
                <h3>Skills</h3>
                <div class="dev-skills">
                    ${curriculo.habilidades.map(hab => `<span>${hab.habilidade}</span>`).join("")}
                </div>
            </div>
            ${curriculo.links?.length ? `
                <div class="dev-block">
                    <h3>Links <br>(clique aqui)</h3>
                    ${curriculo.links
                .filter(link => (link?.url || "").trim())
                .map(link => `
                        <a class="dev-link" href="${link.url}" target="_blank" rel="noopener noreferrer">
                        ${link.nome}<br>
                        </a>
                    `).join("")}
                </div>
                ` : ""}
        </aside>
        <main class="dev-main">
            <section class="dev-hero">
                <h1>Hello World<span>.</span></h1>
                <p>${curriculo.info.resumo || ""}</p>
            </section>
            <section class="dev-section">
                <h2>Experience</h2>
                ${curriculo.experiencias.map(exp => `
                    <div class="dev-card">
                        <span>${exp.periodo}</span>
                        <h3>${exp.cargo}</h3>
                        <h4>${exp.empresa}</h4>
                        <p>${exp.descricao}</p>
                    </div>
                `).join("")}
            </section>
            <section class="dev-section">
                <h2>Education</h2>
                ${curriculo.formacoes.map(form => `
                    <div class="dev-card">
                        <span>${form.periodo}</span>
                        <h3>${form.curso}</h3>
                        <h4>${form.instituicao}</h4>
                    </div>
                `).join("")}
            </section>
        </main>
    </div>
`
}

function luxuryExecutiveTemplate() {
    const nivelToWidth = (nivel) => {
        if (nivel === "Básico") return "25%"
        if (nivel === "Intermediário") return "50%"
        if (nivel === "Avançado") return "75%"
        return "100%"
    }
    return `
    <div class="resume luxury-executive">
      <header class="lux-header">
        <div class="lux-photo">
          ${curriculo.info.foto ? `<img src="${curriculo.info.foto}" alt="Foto">` : `<span>${(curriculo.info.nome || "S")[0]}</span>`}
        </div>
        <div class="lux-title">
          <h1>${curriculo.info.nome || "Seu Nome"}</h1>
          <h2>${curriculo.info.cargo || "Profissional"}</h2>
        </div>
      </header>
      <div class="lux-body">
        <aside class="lux-sidebar">
          <div class="lux-side-block">
            <div class="lux-side-bar-title">Contacts</div>
            <div class="lux-contact-list">
              <div class="lux-contact-item">
                <div class="lux-contact-label">Email</div>
                <div class="lux-contact-value">${curriculo.info.email || ""}</div>
              </div>
              <div class="lux-contact-item">
                <div class="lux-contact-label">Phone</div>
                <div class="lux-contact-value">${curriculo.info.telefone || ""}</div>
              </div>
              <div class="lux-contact-item">
                <div class="lux-contact-label">Location</div>
                <div class="lux-contact-value">${curriculo.info.localizacao || ""}</div>
              </div>
            </div>
          </div>
          ${curriculo.links?.length ? `
            <div class="lux-side-block">
              <div class="lux-side-bar-title">Social Media</div>
              <div class="lux-links">
                ${curriculo.links.map(link => `
                  <div class="lux-link">
                    <div class="lux-link-dot"></div>
                    <div class="lux-link-text">${link.nome || ""}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ``}
        </aside>
        <main class="lux-main">
          <section class="lux-section">
            <div class="lux-section-head">
              <h3>Profile</h3>
              <div class="lux-section-line"></div>
            </div>
            <p class="lux-paragraph">${curriculo.info.resumo || ""}</p>
          </section>
          <section class="lux-section">
            <div class="lux-section-head">
              <h3>Education</h3>
              <div class="lux-section-line"></div>
            </div>
            <div class="lux-timeline">
              ${curriculo.formacoes.map(form => `
                <div class="lux-row">
                  <div class="lux-row-left">
                    <div class="lux-row-title">${form.instituicao || ""}</div>
                    <div class="lux-row-sub">
                      <span class="lux-pill">${form.curso || ""}</span>
                    </div>
                  </div>
                  <div class="lux-row-right">
                    <span class="lux-year">${form.periodo || ""}</span>
                  </div>
                </div>
              `).join("")}
            </div>
          </section>
          <section class="lux-section">
            <div class="lux-section-head">
              <h3>Experience</h3>
              <div class="lux-section-line"></div>
            </div>
            <div class="lux-timeline">
              ${curriculo.experiencias.map(exp => `
                <div class="lux-row">
                  <div class="lux-row-left">
                    <div class="lux-row-title">${exp.empresa || ""}</div>
                    <div class="lux-row-sub">
                      <span class="lux-pill">${exp.cargo || ""}</span>
                    </div>
                    <p class="lux-paragraph lux-paragraph-tight">${exp.descricao || ""}</p>
                  </div>
                  <div class="lux-row-right">
                    <span class="lux-year">${exp.periodo || ""}</span>
                  </div>
                </div>
              `).join("")}
            </div>
          </section>
          <section class="lux-section">
            <div class="lux-section-head">
              <h3>Skills</h3>
              <div class="lux-section-line"></div>
            </div>
            <div class="lux-skills">
              ${curriculo.habilidades.map(hab => `
                <div class="lux-skill">
                  <div class="lux-skill-top">
                    <span class="lux-skill-name">${hab.habilidade || ""}</span>
                    <span class="lux-skill-level">${hab.nivel || ""}</span>
                  </div>
                  <div class="lux-meter">
                    <div class="lux-meter-fill" style="width:${nivelToWidth(hab.nivel)}"></div>
                  </div>
                </div>
              `).join("")}
            </div>
          </section>
        </main>
      </div>
    </div>
  `
}

async function downloadPDF() {
    const { jsPDF } = window.jspdf
    const element = document.querySelector("#resume-template")
    const canvas = await html2canvas(element, { scale: 3, useCORS: true })
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })

    const pageWidth = 210
    const pageHeight = 297
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
    }
    pdf.save("curriculo.pdf")
}

async function sharePDF() {
    if (!navigator.share) {
        alert("Compartilhamento não suportado neste navegador")
        return
    }
    const element = document.querySelector("#resume-template")
    const canvas = await html2canvas(element, { scale: 2 })
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jspdf.jsPDF("p", "mm", "a4")
    const pdfWidth = 210
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    const blob = pdf.output("blob")
    const file = new File([blob], "curriculo.pdf", { type: "application/pdf" })
    await navigator.share({
        files: [file],
        title: "Meu Currículo",
        text: "Confira meu currículo profissional"
    })
}

function setByPath(obj, path, value) {
    const parts = path.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean)
    let cur = obj
    for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i]
        if (cur[key] == null) {
            const nextKey = parts[i + 1]
            cur[key] = String(+nextKey) === nextKey ? [] : {}
        }
        cur = cur[key]
    }
    cur[parts[parts.length - 1]] = value
}

function applyPatch(curriculoObj, patchOps) {
    for (const op of patchOps || []) {
        if (op.op !== "set") continue
        setByPath(curriculoObj, op.path, op.value)
    }
}

function escapeHtml(str = "") {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;")
}

function renderSuggestions(suggestions) {
    const container = document.querySelector("#ai-suggestions")
    if (!container) return
    if (!suggestions?.length) {
        container.innerHTML = ""
        return
    }
    container.innerHTML = `
    <h3 class="ai-title">Sugestões da IA</h3>
    <div class="ai-cards">
      ${suggestions.map((sug, idx) => {
        const before = sug.preview?.before ?? ""
        const after = sug.preview?.after ?? ""
        return `
          <div class="ai-card" data-sug-index="${idx}">
            <div class="ai-card-head">
              <h4>${escapeHtml(sug.title || "Sugestão")}</h4>
              <p class="ai-reason">${escapeHtml(sug.reason || "")}</p>
            </div>
            <div class="ai-diff">
              <div class="ai-diff-col">
                <span class="ai-badge">Antes</span>
                <pre class="ai-pre">${escapeHtml(before)}</pre>
              </div>
              <div class="ai-diff-col">
                <span class="ai-badge ai-badge-good">Depois</span>
                <pre class="ai-pre">${escapeHtml(after)}</pre>
              </div>
            </div>
            <div class="ai-actions">
              <button class="ai-apply" type="button">Aplicar</button>
              <button class="ai-reject" type="button">Rejeitar</button>
            </div>
          </div>
        `
    }).join("")}
    </div>
  `
    container.querySelectorAll(".ai-card").forEach((card) => {
        const idx = Number(card.getAttribute("data-sug-index"))
        card.querySelector(".ai-apply").addEventListener("click", () => {
            const sug = suggestions[idx]
            applyPatch(curriculo, sug.patch)
            salvarDados()
            renderAll()
            card.remove()
        })
        card.querySelector(".ai-reject").addEventListener("click", () => {
            card.remove()
        })
    })
}

async function requestAISuggestions() {
    try {
        const suggestionsContainer = document.querySelector("#ai-suggestions")
        if (suggestionsContainer) {
            suggestionsContainer.innerHTML = `<p>IA analisando melhorias...</p>`
        }
        const response = await fetch("http://localhost:3000/suggest-cv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ curriculo })
        })
        const data = await response.json()
        renderSuggestions(data.suggestions)
    } catch (error) {
        console.log(error)
    }
}