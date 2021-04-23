package edu.neu.madcourse.pawsfriends.Profile;


import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.GridView;
import android.widget.ProgressBar;


import android.content.Intent;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.FragmentTransaction;

import com.google.firebase.auth.FirebaseAuth;
import com.ittianyu.bottomnavigationviewex.BottomNavigationViewEx;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.ImageLoaderConfiguration;

import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import java.util.ArrayList;

import edu.neu.madcourse.pawsfriends.R;
import edu.neu.madcourse.pawsfriends.Utils.BottomNavigationViewHelper;
import edu.neu.madcourse.pawsfriends.Utils.GridImageAdapter;
import edu.neu.madcourse.pawsfriends.Utils.UniversalImageLoader;
import edu.neu.madcourse.pawsfriends.Utils.ViewProfileFragment;
import edu.neu.madcourse.pawsfriends.ViewPostFragment;
import edu.neu.madcourse.pawsfriends.models.Photo;
import edu.neu.madcourse.pawsfriends.models.User;


public class ProfileActivity extends AppCompatActivity implements ProfileFragment.OnGridImageSelectedListener{

    private static final String TAG = "ProfileActivity";

    @Override
    public void onGridImageSelected(Photo photo, int activityNumber) {
        Log.d(TAG, "onGridImageSelected: selected an image gridview: " + photo.toString());

        ViewPostFragment fragment = new ViewPostFragment();
        Bundle args = new Bundle();
        args.putParcelable(getString(R.string.photo), photo);
        args.putInt(getString(R.string.activity_number), activityNumber);
        fragment.setArguments(args);

        FragmentTransaction transaction  = getSupportFragmentManager().beginTransaction();
        transaction.replace(R.id.container, fragment);
        transaction.addToBackStack(getString(R.string.view_post_fragment));
        transaction.commit();

    }

    private static final int ACTIVITY_NUM = 4;
    private static final int NUM_GRID_COLUMNS = 3;

    private Context mContext = ProfileActivity.this;

    private ProgressBar mProgressBar;
    private ImageView profilePhoto;


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        Log.d(TAG, "onCreate: started.");
//        ImageLoader.getInstance().init(ImageLoaderConfiguration.createDefault(ProfileActivity.this));

        init();

    }

    private void init() {
        Log.d(TAG, "init: inflating " + getString(R.string.profile_fragment));

        ProfileFragment fragment = new ProfileFragment();
        FragmentTransaction transaction = ProfileActivity.this.getSupportFragmentManager().beginTransaction();
        transaction.replace(R.id.container, fragment);
        transaction.addToBackStack(getString(R.string.profile_fragment));
        transaction.commit();
    }


}
