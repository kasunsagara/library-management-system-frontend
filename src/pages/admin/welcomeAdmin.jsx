export default function WelcomeAdmin({ user }) {
    return (
        <div className="w-full h-full flex flex-col justify-start items-center pt-40 space-y-6">
            <h1 className="text-6xl font-extrabold leading-tight drop-shadow-lg">
                Welcome! {user?.firstName} ({user?.role})
            </h1>
        </div>
    );
}
