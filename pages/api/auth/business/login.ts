import { supabase } from "@/libs/supabase/supabase_client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required!" });
    }

    try {
        const {
            data: { user, session },
            error,
        } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (!session) {
            return res.status(400).json({ error: "Failed to authenticate user!" });
        }

        const { data: profileData, error: profileError } = await supabase
            .from("profile")
            .select("*")
            .eq("business_id", user!.id);

        if (profileError) {
            return res.status(400).json({ error: "No access!" });
        }

        return res
            .status(200)
            .json({ access_token: session.access_token, userId: session.user.id });
    } catch (err) {
        return res
            .status(500)
            .json({ error: "Login failed due to an unknown error." });
    }
}
