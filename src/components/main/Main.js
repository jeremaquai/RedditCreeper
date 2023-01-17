import {  
    Switch, 
    Route 
} from "react-router-dom";
import IndividualPost from "../../features/individualPost/IndividualPost";
import Posts from "../../features/posts/Posts";
import SubReddits from "../../features/subReddits/SubReddits";
import './Main.css';

export default function Main() {
    return (
        <div className="main">
            <Switch>
                <Route path={'/individualPost'} >
                    <IndividualPost />
                </Route>
                <Route path='/posts'>
                    <Posts />
                </Route>
                <Route path='/' >
                    <SubReddits />
                </Route>
            </Switch>
        </div>
    )
}