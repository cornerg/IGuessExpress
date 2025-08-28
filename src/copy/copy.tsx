const ticket_title = "Welcome aboard the I Guess Express!";
const ticket_description = `The only locomotive service operated by a wannabe content creator.
As a passenger of the Express, you are invited to create your very own boarding ticket! A way to represent who you are to share with the rest of the community.`;

const copyLibrary = {
    ticket_title,
    ticket_description,
}

export default function getCopy(key: keyof typeof copyLibrary) {
    return copyLibrary[key];
}