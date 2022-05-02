function hola() {
    fetch("https://api.chucknorris.io/jokes/categories")
        .then(response => {
                response.json()
                    .then(categories => {
                        const categorySet = [...categories];

                        const randomCategories: string[] = [];
                        for (let count = 0; count < 5; count += 1) {
                            const randomIndex = Math.floor(Math.random() * categorySet.length);
                            const randomCategory = categorySet[randomIndex];
                            randomCategories.push(randomCategory);

                            categorySet.splice(randomIndex, 1);
                        }

                        Promise.all(randomCategories.map( category => {
                            return fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
                                .then(jokeResponse => {
                                    return jokeResponse.json().then((catRandomJoke: { value: string }) => {
                                        return { 
                                            category: category, 
                                            joke: catRandomJoke 
                                        };
                                    });
                                });
                        })).then(myJokes => {
                            myJokes.forEach(item => {
                                const { category, joke } = item;
                                console.log(`
                                Category: ${category}
                                Joke: ${joke.value
                                            .replace(/Chuck/g, "Eduardo")
                                            .replace(/Norris/g, "Burgos")
                                }
                                `);
                            });

                        });

                

            });

        });
}



hola();
