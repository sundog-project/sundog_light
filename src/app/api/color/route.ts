import { getPusherInstance } from "@/libs/pusher/server";

const pusherServer = getPusherInstance();
export const dynamic = 'force-dynamic' // defaults to auto

export type ReturnDataType = {
    selectedColor: string;
};

export async function POST(req: Request) {
    const { selectedColor } = await req.json()
    try {
        await pusherServer.trigger("selected-color-channel", "evt::color", {
            selectedColor: selectedColor,
        } as ReturnDataType);

        return Response.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json(
            { message: "Failed to sockets", error: error },
            { status: 500 }
        );
    }
}