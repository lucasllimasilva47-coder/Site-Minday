export const translations = {
  pt: {
    // Navegação
    home: "Casa",
    agenda: "Agenda",
    pomodoro: "Pomodoro",
    sono: "Sono",
    perfil: "Perfil",
    
    // Header
    tagline: "organize seu dia com diversão",
    
    // Home Screen
    welcome: "Bem-vindo ao",
    subtitle: "seu hub de estudos gamificado",
    clickToOpen: "Clique para abrir",
    
    // Agenda Screen
    classes: "Aulas",
  addClass: "Adicionar aula",
    className: "Nome da aula",
    classTime: "08:00",
  tasks: "Tarefas",
  addTask: "Adicionar tarefa",
    newTask: "Nova tarefa",
    nextStatus: "Próximo status",
    
    // Status das tarefas
    pending: "Pendente",
    inProgress: "Em andamento",
    completed: "Concluída",
    
    // Pomodoro Screen
    easy: "Fácil",
    medium: "Médio",
    hard: "Difícil",
    study: "Estudo",
    break: "Descanso",
    pause: "Pausar",
    start: "Iniciar",
    reset: "Resetar",
    cyclesCompleted: "Ciclos concluídos",
    quickTip: "Dica rápida",
    pomodoroTip: "Use os ciclos para estudar focado e faça pequenas pausas para recuperar energia. No modo Difícil, aumente a água e reduza distrações.",
    
    // Sleep Screen
    sleep: "Sono",
    readyToRecord: "Pronto para registrar",
    recordingInProgress: "Registro em andamento",
    recordSleep: "Registrar sono",
    endRecording: "Encerrar registro",
    records: "Registros",
    noRecordsYet: "Sem registros ainda.",
    startTime: "Início",
    endTime: "Fim",
    duration: "Duração",
    recording: "gravando...",
    sleepQuality: "Qualidade do sono",
    sleepQualityTip: "Depois de registrar uma noite de sono, você pode adicionar notas como 'dormi bem' ou 'acordei cedo'.",
    
    // Profile Screen
    profile: "Perfil",
    editProfile: "Editar Perfil",
    name: "Nome",
    about: "Sobre",
    profileTip: "Dica: personalize seu apelido para o mascote chamar você!",
    settings: "Configurações",
    logout: "Sair",
    language: "Idioma",
    languageSaved: "A língua é salva neste dispositivo.",
    
    // Botões e ações
    save: "Salvar",
    cancel: "Cancelar",
    edit: "Editar",
  delete: "Remover",
    

  // Qualidade do sono
  inadequado: "Inadequado",
  adequado: "Adequado",
  excessivo: "Excessivo",

  // Tempo
  minutes: "min",
  hours: "h",
    
    // Mensagens
    loading: "Carregando...",
    error: "Erro",
    success: "Sucesso",
    
    // Placeholders
    enterName: "Digite seu nome",
    enterBio: "Digite uma descrição sobre você",
  enterTask: "Digite uma tarefa",
    enterClassName: "Digite o nome da aula",
    enterTime: "Digite o horário"
  }
};

export type Language = 'pt';
export type TranslationKey = keyof typeof translations.pt;
