var React = require("react");
const Proptypes = require("prop-types");
const api = require("../utills/api.js");
const Loading = require('./Loading');			

 function Selectedlanguage(props) {
	const languages = ["All", "Ruby", "Javascript", "Java", "Python" ]
	return (
			<div>
				<ul className="languages">
					{languages.map(lang =>
						<li
							style={lang === props.selectedlanguage ? {color:'red'} : null}
							onClick={props.onSelect.bind(null, lang)}

							key={lang}>
							{lang}
						</li>
					)}
				</ul>
			</div>
		)
}

function RepoGrid(props) {
	return (
		<ul className="popular-list">
			{props.repos.map((repo, index) =>
				<li key={repo.name} className="popular-item">

				            <div className='popular-rank'>#{index + 1}</div>
				            <ul className='space-list-items'>
				              <li>
				                <img
				                  className='avatar'
				                  src={repo.owner.avatar_url}
				                  alt={'Avatar for ' + repo.owner.login}
				                />
				              </li>
				              <li><a href={repo.html_url}>{repo.name}</a></li>
				              <li>@{repo.owner.login}</li>
				              <li>{repo.stargazers_count} stars</li>
				            </ul>
				          </li>
				)}
		</ul>
		)

}

RepoGrid.proptypes = {
	repos: Proptypes.array.isRequired
}

Selectedlanguage.proptypes = {
	selectedlanguage: Proptypes.string.isRequired,
	onSelect: Proptypes.string.isRequired
}

class Popular extends React.Component{
	constructor(props){
		super(props)
		this.state = { 
			selectedlanguage: "All",
			repos: null
		}
		this.updateLanguage = this.updateLanguage.bind(this)
	}

	componentDidMount(){
		this.updateLanguage(this.state.selectedlanguage);
	}

	updateLanguage(lang){
		this.setState({
			selectedlanguage: lang,
			repos: null
		})

			api.fetchPopularRepos(lang)
			.then(function(repos){
				this.setState({
					repos: repos
				})

			}.bind(this));

	}

	render(){
				
		return(
			<div>
				<Selectedlanguage selectedlanguage={this.state.selectedlanguage}
				onSelect={this.updateLanguage} />
				{!this.state.repos 
				? <Loading />
				: <RepoGrid repos={this.state.repos} />}
			</div>

			)
	}
}

module.exports = Popular;