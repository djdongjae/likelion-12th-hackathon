import instance from "./axios";

export async function insertUser(userInfo) {
    try {
        await instance.post("/user-info", userInfo);
    } catch (error) {
        alert("유저 정보 저장 에러: " + (error instanceof Error ? error.message : error));
    }
}

export async function insertFood(foodInfo, meal, date) {
    try {
        await instance.post("/food?meal=" + meal + "&date=" + date, foodInfo);
    } catch (error) {
        alert("식단 정보 저장 에러: " + (error instanceof Error ? error.message : error));
    }
}

export async function checkFood(date) {
    try {
        const response = instance.get("/food?date=" + date);
        console.log(response);
        return response.data.data;
    } catch (error) {
        alert("식단 정보 조회 에러: " + (error instanceof Error ? error.message : error));
    }
}

export async function loadUser(date) {
    try {
        const response = await instance.get("/user-info?date=" + date);
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        alert("유저 정보 조회 에러: " + (error instanceof Error ? error.message : error));
    }
}

export async function loadWeight(date) {
    try {
        const response = await instance.get("/weight?date=" + date);
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        // alert("체중 정보 조회 에러")
    }
}

export async function insertWeight(weight, date) {
    try {
        await instance.post("/weight?date=" + date, weight);
    } catch (error) {
        alert("체중 입력 오류: " + (error instanceof Error ? error.message : error));
    }
}

export async function loadFitness(date) {
    try {
        const response = await instance.get("/fitness?date=" + date);
        return response.data.data;
    } catch (error) {
        // alert("체중 정보 조회 에러: ")
    }
}

export async function insertFitness(fitness, date) {
    try {
        await instance.post("/fitness?date=" + date, fitness);
    } catch (error) {
        alert("체중 입력 오류: " + (error instanceof Error ? error.message : error));
    }
}