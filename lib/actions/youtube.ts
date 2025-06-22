'use server'

// interface ApiResponse {
//   status: string;
//   request_id: string;
//   data: {
//     channel: {
//       id: string;
//       videos: Video[];
//       cursor: string | null;
//     };
//   };
// }

export interface Video {
  video_id: string;
  title: string;
  description: string;
  published_at: string; // e.g., "14 years ago"
  video_length: string; // e.g., "3:28"
  view_count: number;
  thumbnail: Thumbnail[];
  moving_thumbnails: unknown[];
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export async function getVideosInfo(): Promise<Video[]> {
  const url = 'https://youtube-scraper3.p.rapidapi.com/api/v1/channel/videos?channel_id=UCjEXry5mjyhACMxTxCu7VWg';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY!,
      'x-rapidapi-host': 'youtube-scraper3.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.data && result.data.channel && result.data.channel.videos) {
      return result.data.channel.videos;
    } else {
      return [];
    }
    
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
} 