export class StringUtils {
  static getInitials(value: string): string {
    let initials = "";
    const filteredValue = value
      .toUpperCase()
      .replace(
        /( )(((DE|DEL|Y|O|E|A|U|POR|PARA|LAS|LOS|LA|EL|EN) (DE|DEL|Y|O|E|A|U|POR|PARA|LAS|LOS|LA|EL|EN))|DE|DEL|Y|O|E|A|U|POR|PARA|LAS|LOS|LA|EL|EN)( )/,
        ""
      )
      .replace(/ \([^)]*\)/, "");

    const words = filteredValue.split(" ").filter(word => word.length > 0);

    if (words.length === 0) return "";

    if (words.length === 1) {
      initials = filteredValue.substring(0, Math.min(this.length, 4));
    } else {
      const lastWord = words[words.length - 1];
      const matchesInLast = lastWord.match(/[IVX]+/) ?? [];
      if (matchesInLast.length === 1 && matchesInLast[0] === lastWord && words.length === 2) {
        initials = `${words[0].substring(0, Math.min(this.length, 3))} ${lastWord.toUpperCase()}`;
      } else {
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          if (i === words.length - 1) {
            const matchesInWord = word.match(/[IVX]+/) ?? [];
            if (matchesInWord.length === 1 && matchesInWord[0] === lastWord) {
              initials += ` ${word.toUpperCase()}`;
            } else {
              initials += word[0];
            }
          } else {
            initials += word[0];
          }
        }
      }
    }

    return initials;
  }
}
