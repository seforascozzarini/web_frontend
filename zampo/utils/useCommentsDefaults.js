export default function useCommentsDefaults() {

    const ACTIONS = {
        UPVOTE: {
            value:1,
            color:'primary',
            userKey:'user_upvotes',
            icon:'mdi-thumb-up'
        },
        DOWNVOTE: {
            value:2,
            color:'primary',
            userKey:'user_downvotes',
            icon:'mdi-thumb-down'
        },
        FLAG: {
            value:3,
            color:'error',
            userKey:'user_flagged',
            icon:'mdi-flag'
        },
    }

    return {
        ACTIONS,
    }

}