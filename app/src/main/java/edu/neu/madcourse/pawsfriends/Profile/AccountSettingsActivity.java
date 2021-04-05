package edu.neu.madcourse.pawsfriends.Profile;


import android.os.Bundle;
import androidx.annotation.Nullable;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

import edu.neu.madcourse.pawsfriends.R;

public class AccountSettingsActivity extends AppCompatActivity {

    private static final String TAG = "AccountSettingsActivity";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_accountsettings);
        Log.d(TAG, "onCreate: started.");
    }
}