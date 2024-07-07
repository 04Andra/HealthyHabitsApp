
export const fetchDataGetExercise = async () => {
    const apiKey = 'Iwp7G3ekSGFSy+2qIBc9Gg==i0woxvSeiUMomuuJ';
    try {
        const response = await fetch(
            "https://api.api-ninjas.com/v1/exercises",
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': apiKey
                },
            }
        );
        return await response.json();
    } catch (error) {
        console.error('Error fetching exercises:', error);
        return [];
    }
};
