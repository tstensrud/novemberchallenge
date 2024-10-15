const addUserr = async (username) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            name: username,
            sessions: 0
        });
        console.log("Document written with ID: ", docRef.id);
    } catch(e)  {
        console.error("Error adding document: ", e)
    }
}

export const svgDimensions = 20;
export const svgClass = 'stroke-2 stroke-primary-color fill-none';