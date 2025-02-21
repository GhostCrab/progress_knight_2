function enterChallenge(challengeName) {
    rebirthReset(false)
    gameData.active_challenge = challengeName

    for (const taskName in gameData.taskData) {
        const task = gameData.taskData[taskName]
        task.maxLevel = 0
    }
}

function exitChallenge() {
    setChallengeProgress()
    rebirthReset(false)    
    gameData.active_challenge = ""

    for (const taskName in gameData.taskData) {
        const task = gameData.taskData[taskName]
        task.maxLevel = 0
    }
}

function setChallengeProgress() {
    if (gameData.active_challenge == "an_unhappy_life") {
        gameData.challenges.an_unhappy_life = Math.max(gameData.challenges.an_unhappy_life, getHappiness())
    }
    if (gameData.active_challenge == "rich_and_the_poor") {
        gameData.challenges.rich_and_the_poor = Math.max(gameData.challenges.rich_and_the_poor, getIncome())
    }
    if (gameData.active_challenge == "time_does_not_fly") {
        gameData.challenges.time_does_not_fly = Math.max(gameData.challenges.time_does_not_fly, getGameSpeed())
    }
    if (gameData.active_challenge == "dance_with_the_devil") {
        gameData.challenges.dance_with_the_devil = Math.max(gameData.challenges.dance_with_the_devil, Math.max(0, getEvilGain() - 10))
    }
}

function getChallengeBonus(challenge_name, current = false) {
    if (challenge_name == "an_unhappy_life") {
        return softcap(Math.pow((current ? getHappiness() : gameData.challenges.an_unhappy_life) + 1, 0.22), 100)
    }
    if (challenge_name == "rich_and_the_poor") {
        return softcap(Math.pow((current ? getIncome() : gameData.challenges.rich_and_the_poor) + 1, 0.18), 10)
    }
    if (challenge_name == "time_does_not_fly") {
        return softcap(Math.pow((current ? getGameSpeed() : gameData.challenges.time_does_not_fly) + 1, 0.05), 2)
    }
    if (challenge_name == "dance_with_the_devil") {
        return softcap(Math.pow((current ? Math.max(0, getEvilGain() - 10) : gameData.challenges.dance_with_the_devil) + 1, 0.1), 2, 0.15)
    }
}

