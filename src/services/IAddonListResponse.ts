interface IAddonListResponse {
	publishedfileid: number;
	title: string;
	preview_url: string;
	subscriptions: number;
	lifetime_subscriptions: number;
	favorited: number;
	lifetime_favorited: number;
	views: number;
	vote_data: { votes_up: number; votes_down: number };
}

export default IAddonListResponse;
