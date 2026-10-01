import { supabase } from './services/supabaseClient'
import { useEffect } from 'react'

function App() {

    useEffect(() => {
        supabase.from('images').select("*").then(console.log)
    },[])

    return (<>Test Supabase</>)
}
export default App