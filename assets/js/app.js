const tasks = [
    {
        id: 1,
        weekDays: {seg: 'complete', ter: 'overdue', qua: 'complete', qui: 'overdue', sex: 'pending', dom: 'pending'},
        title: 'Task 1',
        date: '28/05/2023',
        time: '17:00',
        duration: '40',
        description: 'task description',
        repeat: ['seg', 'ter', 'qua', 'qui', 'sex', 'dom']
        
    },
    {
        id: 2,
        title: 'Task 2',
        weekDays: {seg: 'complete', ter: 'complete', qua: 'complete', qui: 'complete', sex: 'pending', dom: 'pending'},
        date: '28/05/2023',
        time: '15:00',
        duration: '40',
        description: 'Task description',
        repeat: ['seg', 'ter', 'sex', 'dom']
        
    },
    {
        id: 3,
        weekDays: {seg: 'complete'},
        title: 'Task 4',
        date: '28/05/2023',
        time: '15:00',
        duration: '40',
        description: 'Task description',
        repeat: null
        
    },
    {
        id: 4,
        weekDays: {'seg': 'overdue'},
        title: 'Task 5',
        date: '28/05/2023',
        time: '15:00',
        duration: '40',
        description: 'Task description',
        repeat: null
    },
    {
        id: 5,
        weekDays: {'qua': 'overdue','qui': 'complete','sex': 'pending','dom': 'pending'},
        title: 'Task 6',
        date: '28/05/2023',
        time: '15:00',
        duration: '40',
        description: 'Task description',
        repeat: null
    },
    

]
const day = 'qui'
const weekDays = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']
const htmlItemDayTask = `
<div class="time-task">
    <i class="fa-regular fa-clock time-clock"></i>
    <span class="time">{time}</span>
</div>
<div class="task-container">
    <h4 class="task-item task-{task-status}">{task-title}</h4>
`

const dalyTaskContainer = document.getElementById('container-daily-tasks')
const FloatingMenuHtml = `
<section id="floating-menu">
    
    <footer>
        <button id="btn-close-window">X</button>
    </footer>

    <div id="floating-menu-content">
        <div class="data-table">
        <div class="table-btn">Visão geral</div>
        <div class="table-container table-show">
        <div class="informative">
            <div class="circle-info" style="background-color: #eced87;"></div>
            <span>Pendente</span>
            <div class="circle-info" style="background-color: #ff9e8e;"></div>
            <span>Atrasada</span>
            <div class="circle-info" style="background-color: #aeeca8;"></div>
            <span>Concluida</span>
        </div>
            <h4 class="task-item task-{status}">{title}</h4>
            <div>
                <ul class="data-list">
                    <li>
                        <h4>horario: </h4> <span>{time} Hrs</span>
                    </li>
                    <li>
                    <h4>Duração: </h4> <span>{duration}</span>
                    </li>
                    <li>
                        <h4>Descrição: </h4> <span>{description}</span>
                    </li>
                </ul>
                <div style="display: flex; justify-content: center;">
                    <button class="{class-btn-status}" id="btn-start-task">{text-feedback}</button>
                </div>
            </div>

        </div>
        </div>
    </div>
</section>
`

function editTaskMode(element, status){
    const mainDiv = document.querySelector('main')
    let div = document.createElement('div')
    div.id = 'floating-container'
    
    console.log(status)
    if (status == 'complete'){
        var btnStatus = 'Tarefa completa!'
        var classBtnStatus = 'btn-disable'
    }
    else{
        var btnStatus = 'Marcar como concluida'
        var classBtnStatus = 'btn-green'
    }
    div.innerHTML = FloatingMenuHtml.replace('{title}', element.title).replace('{status}', status).replace('{time}', element.time).replace('{duration}', element.duration).replace('{description}', element.description).replace('{class-btn-status}', classBtnStatus).replace('{text-feedback}', btnStatus)

    mainDiv.appendChild(div)

    const closeBtnFloating = document.getElementById('btn-close-window')

    closeBtnFloating.addEventListener('click', () => {
    let FloatingMenu = document.getElementById('floating-container')
    FloatingMenu.remove()

    
})
}

function createTaskDay(tasks){
    if (Object.keys(tasks).length < 1){
        let div = document.createElement('div')
        dalyTaskContainer.appendChild(div)
        div.innerHTML = '<p class="no-task-avaliable">Nenhuma tarefa disponivel até agora.</p>'
    }
    tasks.forEach((element) =>{
        let div = document.createElement('div')
        dalyTaskContainer.appendChild(div)

        div.classList.add('new-task')
        
        let status = element.weekDays[day]
        div.innerHTML = htmlItemDayTask.replace('{time}', element.time).replace('{task-title}', element.title).replace('{task-status}', status)

        div.addEventListener('click', () => editTaskMode(element, status))
    
    })


}
function createTasksWeek(){
    var dailyTasks = []
    tasks.forEach((element) => {
        for (let elm in element['weekDays']) {
            if (elm == day){
                dailyTasks.push(element)
            }
            let dayWeekContainer = document.getElementById(elm)
            let taskContainer = dayWeekContainer.querySelector('.task-container')

            let h4 = document.createElement('h4')

            let status = element['weekDays'][elm]
            h4.classList.add('task-item')
            h4.classList.add(`task-${status}`)
            
            h4.addEventListener('click', () => editTaskMode(element, status))
            taskContainer.appendChild(h4)
            h4.innerHTML = element['title']

        }

    })

    // organizando as tarefas apartir do horario
    dailyTasks.sort((a, b) => {
        const timeA = a.time // Horário da tarefa a
        const timeB = b.time // Horário da tarefa b
      
        // Comparação dos horários
        if (timeA < timeB) {
          return -1 // a vem antes de b
        } else if (timeA > timeB) {
          return 1 // a vem depois de b
        } else {
          return 0 // a e b têm o mesmo horário
        }
      })
      
      createTaskDay(dailyTasks);

    
    weekDays.forEach((dayWeek) => {
        let weekDayContainer = document.getElementById(dayWeek).querySelector('.task-container')
    
        if (weekDayContainer.childElementCount <= 0){
            weekDayContainer.innerHTML = '<p class="no-task-avaliable">Nenhuma tarefa disponivel até agora.</p>'
        }
    })

}

createTasksWeek()
 

