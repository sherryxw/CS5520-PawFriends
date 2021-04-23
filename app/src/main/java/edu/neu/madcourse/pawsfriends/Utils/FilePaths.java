package edu.neu.madcourse.pawsfriends.Utils;

import android.os.Environment;
import android.content.Context;

public class FilePaths {
//    public String ROOT_DIR = Environment.getExternalStorageDirectory().getPath();
    private Context mContext;
    String ROOT_DIR = mContext.getExternalFilesDir(null).getAbsolutePath();

    public String PICTURES = ROOT_DIR + "/Pictures";
    public String CAMERA = ROOT_DIR + "/DCIM/Camera";
    public String STORIES = ROOT_DIR + "/Stories";

    public String FIREBASE_STORY_STORAGE = "stories/users";
    public String FIREBASE_IMAGE_STORAGE = "photos/users/";
}
