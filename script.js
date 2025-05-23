document.addEventListener('DOMContentLoaded', () => {
    const datePicker = document.getElementById('datePicker');

    // 페이지 로드 시 오늘 날짜로 설정
    const today = getTodayDate();
    datePicker.value = today;
    loadTasksForDate(today); // 오늘 날짜의 할 일 불러오기

    // 날짜 변경 시 해당 날짜의 할 일 불러오기
    datePicker.addEventListener('change', (event) => {
        loadTasksForDate(event.target.value);
    });
});

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // 예: "2025-05-22"
}

// 특정 날짜의 할 일 목록을 localStorage에 저장
function saveTasks(date, tasks) {
    localStorage.setItem(`tasks_${date}`, JSON.stringify(tasks));
}

// 특정 날짜의 할 일 목록을 localStorage에서 불러오기
function loadTasks(date) {
    const tasksString = localStorage.getItem(`tasks_${date}`);
    return tasksString ? JSON.parse(tasksString) : [];
}

// 특정 날짜의 할 일 목록을 화면에 표시
function loadTasksForDate(date) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // 기존 목록 초기화
    const tasks = loadTasks(date);
    tasks.forEach(taskText => {
        addTaskToDOM(taskText);
    });
}

// 새로운 할 일을 추가하고 localStorage에 저장
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("할 일을 입력하세요!");
        return;
    }

    const selectedDate = document.getElementById('datePicker').value; // 현재 선택된 날짜 가져오기
    const tasks = loadTasks(selectedDate);
    tasks.push(taskText);
    saveTasks(selectedDate, tasks); // 선택된 날짜에 할 일 저장

    addTaskToDOM(taskText);
    taskInput.value = ''; // 입력 필드 초기화
}

// 할 일을 DOM(화면)에 추가
function addTaskToDOM(taskText) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function() {
        // DOM에서 제거 (시각적 피드백)
        li.remove();
        // localStorage에서 제거
        removeTask(taskText);
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// 할 일을 localStorage에서 제거
function removeTask(taskTextToRemove) {
    const selectedDate = document.getElementById('datePicker').value; // 현재 선택된 날짜 가져오기
    let tasks = loadTasks(selectedDate);
    // filter를 사용하여 제거하려는 항목을 제외한 새 배열 생성
    tasks = tasks.filter(task => task !== taskTextToRemove);
    saveTasks(selectedDate, tasks); // 변경된 목록 저장
}
