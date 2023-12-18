export interface allDataType {
    dailyForm: {
      id: number;
      dayNumber: number;
      diary: string | null; 
      todo1: string | null;
      todo2: string | null;
      todo3: string | null;
      todo4: string | null;
      todo5: string | null;
      todoChecked1: boolean;
      todoChecked2: boolean;
      todoChecked3: boolean;
      todoChecked4: boolean;
      todoChecked5: boolean;
      notTodo1: string | null;
      notTodo2: string | null;
      notTodo3: string | null;
      notTodoChecked1: boolean;
      notTodoChecked2: boolean;
      notTodoChecked3: boolean;
      todoPriority: string | null; 
      date: string;
      dayRating: number;
      wakingUpHour: Date | null;
      bedtimeHour: Date | null; 
      morningHabit: boolean;
      eveningHabit: boolean;
      routineId: number;
      rightPath: boolean;
      gratitude1: string;
      gratitude2: string;
      gratitude3: string;
    };
    routine: {
      id: number;
      name: string;
      dateStart: Date;
      dateEnd: Date;
      finished: boolean;
      objectivesId: number;
      why: string;
      userId: number;
    };
    user: {
      id: number;
      email: string;
      provider: string;
      firstName: string;
      lastName: string;
      userName: string;
      isAdmin: boolean;
    };
    objectives: {
      id: number;
      objective1: string | null;
      objective2: string | null;
      objective3: string | null; 
      objective4: string | null; 
      objective5: string | null; 
      objectiveRanking1: number | null;
      objectiveRanking2: number | null;
      objectiveRanking3: number | null; 
      objectiveRanking4: number | null; 
      objectiveRanking5: number | null; 
      objectiveAchieved1: boolean;
      objectiveAchieved2: boolean;
      objectiveAchieved3: boolean;
      objectiveAchieved4: boolean;
      objectiveAchieved5: boolean;
      morningHabit: string | null; 
      eveningHabit: string | null; 
    };
  }