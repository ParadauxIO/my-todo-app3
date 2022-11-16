import { useEffect, useState } from "react";
import { supabase } from "./state/supabase";
import Auth from "./views/Auth";
import Home from "./views/Home";

export default function App() {
    const [session, setSession] = useState(undefined);

    async function load() {
        let { data, error } = await supabase.auth.getSession();
        console.log(error);
        setSession(data);

        supabase.auth.onAuthStateChange((_event, session) => {
            console.log(_event);
            setSession(session);
        });
    }

    useEffect(() => {
        load();
    }, []);

    return session ? <Home /> : <Auth />;
}
