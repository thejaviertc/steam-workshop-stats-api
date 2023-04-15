interface IAddonListResponse {
	publishedfileid: number;
	title: string;
	preview_url: string;
	views: number;
	subscriptions: number;
	favorited: number;
	vote_data: { score: number; votes_up: number; votes_down: number };
}

export default IAddonListResponse;
