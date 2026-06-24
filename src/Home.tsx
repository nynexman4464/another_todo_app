import { Routes, Route, Link } from 'react-router-dom';

export const Home = () => {
    return (<><section>
        <h1>Home</h1>
        <p>TODO!</p>
    </section>
        <nav>
            <Link to="/about">About</Link>
        </nav></>
    );
};
