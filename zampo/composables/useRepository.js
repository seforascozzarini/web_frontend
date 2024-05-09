import users from '~/repository/users'
import posts from '~/repository/posts'
import comments from '~/repository/comments'
import content from '~/repository/content'
import stories from '~/repository/stories'
import contacts from '~/repository/contacts'
import payments from '~/repository/payments'


export default function useRepository(){
    const client = useNuxtApp().$HTTPClient

    return {
        users: users(client),
        posts: posts(client),
        comments: comments(client),
        content: content(client),
        stories: stories(client),
        contacts: contacts(client),
        payments: payments(client),
    }
}