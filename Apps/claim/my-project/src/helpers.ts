export const  truncateText =(inputText : string | undefined, maxLength : number) => {
    //@ts-ignore
      if (inputText?.length <= maxLength) {
        // If the input text has 8 characters or less, return it as is.
        return inputText;
      } else {
        // Otherwise, truncate and format the text.
        const firstFourDigits = inputText?.slice(0, 6);
        const lastFourDigits = inputText?.slice(-4);
        return `${firstFourDigits}...${lastFourDigits}`;
      }
    }
