export default function nestToken (tokens) {
    console.log(tokens);
    var nestedTokens = []
    // 栈
    var sections = []

    // 收集器
    var collector = nestedTokens
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        console.log(token);
        switch (token[0]) {
            case '#':
                collector.push(token)
                sections.push(token)
                collector = token[2] = []
                break;
            case '/':
                sections.pop()
                collector = sections.length > 0 ? sections[sections.length - 1][1] : nestedTokens
                break;
            default:
                nestedTokens.push(token)
                break;
        }
    }

    console.log(nestedTokens);
    return nestedTokens
}