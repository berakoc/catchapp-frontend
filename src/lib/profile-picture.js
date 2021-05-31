const colorSet = ['#ef476f', '#ffd166', '#06d6a0', '#118ab2'];

export const getRandomColor = () =>
    colorSet[Math.floor(Math.random() * colorSet.length)];
