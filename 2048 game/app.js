document.addEventListener('DOMContentLoaded', ()=>{
    let board = []
    const size = 4 
    const statusGame = document.getElementById('status');
    const scoreStatus = document.getElementById('current-score');    
    const btnRestart = document.getElementById('btn_restart');
    const hightScoreElm = document.getElementById('hight-score');
    let hightScore = localStorage.getItem('2048-hightScore')||0;
    let currentScore = 0;
   

    const initailizeGame = () =>{
        board = [...Array(size)].map(()=>Array(size).fill(0));
        addRandomTile();
        addRandomTile();
        renderBoard();
    }

    const restart = () =>{
        
        currentScore = 0;
        scoreStatus.textContent = 0;
        hightScore = 0;
        hightScoreElm.textContent = 0;
        initailizeGame();
        statusGame.style.opacity = 0;
    }



    function updateScore(score){
        currentScore += score;
        scoreStatus.textContent = currentScore;
        if(currentScore > hightScore){
            hightScore = currentScore;
            hightScoreElm.textContent = hightScore;
            localStorage.setItem('2048-hightScore', hightScore)
        }

        
    }
    
    
    
    const addRandomTile = ()=>{
        const emptyCell = [];
    
        for(let i = 0;i < size;i++){
            for(let j = 0;j < size;j++){
                if(board[i][j] === 0){
                    emptyCell.push({x : i, y: j});
                }    
            }
        }
    
        if(emptyCell.length > 0){
            const randomIndex = emptyCell[Math.floor(Math.random()*emptyCell.length)];
            board[randomIndex.x][randomIndex.y] = Math.random() < 0.9 ? 2 : 4;
            const cell = document.querySelector(`[data-row="${randomIndex.x}"][data-col="${randomIndex.y}"]`);
            cell.classList.add('new-tile')
        }
    
    }
    
    const renderBoard = ()=>{
    
        for(let i = 0;i < size;i++){
            for(let j = 0;j < size;j++){
                const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                const prevValue = cell.dataset.value;
                const currentValue = board[i][j];
                if(currentValue != 0){
                    cell.dataset.value = String(currentValue)
                    cell.textContent = currentValue;

                    if(currentValue != parseInt(prevValue) && !cell.classList.contains('new-tile')){
                        cell.classList.add('merge-tile')
                    }
                }else{
                    cell.textContent = '';
                    delete cell.dataset.value;
                    cell.classList.add('new-tile')
                }

            }
        }
    
    }
    
    
    const move = (direction) =>{
        let hasChange = false;
        
    
        if(direction === "ArrowUp" || direction === "ArrowDown"){
            for(let i = 0;i < size;i++){
                const colum = [...Array(size)].map((_, j) => board[j][i]);
        
                const newColum = transform(colum, direction == "ArrowUp");
                // console.log(newColum)
                
                for(let j = 0; j < size;j++){
                    if(board[j][i] !== newColum[j]){
                        hasChange = true;
                        board[j][i] = newColum[j];
                    }
                }
            }
        }else if(direction === "ArrowLeft" || direction === "ArrowRight"){
            for(let i = 0;i < size;i++){
                const row = board[i];
                const newRow = transform(row, direction === "ArrowLeft");
                if(row.join(',') !== newRow.join(',')){
                    hasChange = true;
                    board[i] = newRow;
                }
            }
        }
        // console.log();
        if(hasChange){
            addRandomTile();
            renderBoard();
            checkGameOver();
        }
    
        
    }
    
    const transform = (row, move) =>{
        let newLine = row.filter(cell => cell != 0);
    
        if(!move){
            newLine.reverse();
        }
    
        for(let i = 0; i < newLine.length-1;i++){
            if(newLine[i] === newLine[i+1]){
                newLine[i]*=2;
                updateScore(newLine[i]);
                newLine.splice(i+ 1, 1);
            }
        }
    
        while(newLine.length < row.length){
            newLine.push(0);
        }
    
        if(!move){
            newLine.reverse();
        }
        return newLine
    }
    
    const checkGameOver = () =>{
        
        for(let i = 0;i < size;i++){
            for(let j = 0;j < size;j++){
                if(board[i][j] === 0){
                    return;
                }

                if(i < size-1 && board[i][j] === board[i][j+1]){
                    return;
                }

                if(j < size-1 && board[j][i] === board[j+1][i]){
                    return;
                }

                
            }
        }

       
        statusGame.style.opacity = 1;
     

    }

    document.addEventListener('keydown' ,event =>{
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)){
            move(event.key)
        }
    });

    btnRestart.addEventListener('click', ()=>{
        restart();
    });

    initailizeGame();
    
});








