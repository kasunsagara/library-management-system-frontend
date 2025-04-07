export default function WelcomeAdmin({ user }) {

    return (
        <div className="w-full h-full flex flex-col justify-center items-center space-y-6">
            <h1 className="text-6xl font-extrabold text-secondary leading-tight drop-shadow-lg text-center">
                Welcome! {user?.firstName} ({user?.role})
            </h1>
        </div>
    );
}
