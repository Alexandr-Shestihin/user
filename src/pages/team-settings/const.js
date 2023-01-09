export const socials = [
    {
        label: "Facebook",
        value: "facebook",
    },
    {
        label: "Instagram",
        value: "instagram",
    },
    {
        label: "Twitch",
        value: "twitch",
    },
    {
        label: "Youtube",
        value: "youtube",
    },
    {
        label: "Reddit",
        value: "reddit",
    },
    {
        label: "VK",
        value: "vk",
    },
    {
        label: "Twitter",
        value: "twitter",
    },
    {
        label: "Discord",
        value: "discord",
    },
    {
        label: "Whatsapp",
        value: "whatsapp",
    },
    {
        label: "Teamspeak",
        value: "teamspeak",
    },
];

export const socialState = (socials) => {
    let initial = [];

    if(socials) {
        initial.push({
            options: socials,
            selectedOption: [socials[0]],
            url: "",
            error: "",
        });
    }

    return initial;
}

export const initialFormFields = (socialState = [], initialErrors = {}) => ({
    gameOptions: [],
    name: "",
    founded: "",
    description: "",
    game: [],
    country: [],
    image: "",
    email: "",
    socialState: null,
    links: [],
    errors: initialErrors,
    error: false,
})

export const initialErrors = {
    name: "",
    description: "",
    founded: "",
    game: "",
    image: "",
    country: "",
    tag: "",
    email: ""
}

export const  handleLoadAvatar = (file, setState) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.createElement("img");
        img.onload = () => {
            const canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const MAX_WIDTH = 400;
            const MAX_HEIGHT = 400;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            setState(canvas.toDataURL("image/png"));
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
};

export const reverseDate = (date) => date.split("-").reverse().join("-");

export const isDateValid = (date, isRequired = false) => {
    const isDateCorrect = (d) => !isNaN(d.getTime()),
        isDateInPast = (d) => {
            const now = new Date();

            return d.getTime() < now.getTime();
        };

    // if empty
    if (!date.length && isRequired) {
        return "This field is required";
    } else if (!date.length) return "";

    // is field set?
    if (date.split("").indexOf("_") !== -1) {
        return "Please set correct date";
    }

    // is date correct?
    const dateToCheck = new Date(reverseDate(date));

    if (!isDateCorrect(dateToCheck)) {
        return "Date is invalid";
    }

    // date in past?
    if (!isDateInPast(dateToCheck)) {
        return "Should be in past";
    }

    return "";
};

export const getDate = (inputDate) => {
    const date = inputDate ? new Date(inputDate) : new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    return `${d < 10 ? `0${d}` : d}-${m < 10 ? `0${m}` : m}-${y}`;
}